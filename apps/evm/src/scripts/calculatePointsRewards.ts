const dotenv = require('dotenv').config();
const BN = require('bignumber.js');
const { createClient: createClients } = require('@supabase/supabase-js');
const { DEFAULT_POINT_THRESHOLD,
  DEFAULT_BONUS_MULTIPLICATOR,
  MARKETS_REWARDS_CONFIGURATIONS
} = require('./pointsConstants');

const GRAPHQL_URL = 'https://gateway.thegraph.com/api/subgraphs/id/Ha7WNTEk2U1MvMUVMmmv8e7uZxJUYY4n8r57iJHYyYcJ';
const sb = createClients(process.env.DB_URL, process.env.DB_API_KEY)

type Account = {
  id: string;
};

type Accounts = {
  account: Account;
  vTokenBalanceMantissa: string;
  storedBorrowBalanceMantissa: string;
};

type Market = {
  id: string;
  symbol: string;
  totalSupplyVTokenMantissa: string;
  underlyingName: string;
  underlyingSymbol: string;
  underlyingPriceCentsMantissa: string;
  underlyingDecimals: number;
  vTokenDecimals: number;
  accounts: Accounts[];
}

enum LiquidityType {
  SUPPLY = 'SUPPLY',
  BORROW = 'BORROW'
}

type MarketSnapshotHistory = {
  market_id: string;
  symbol: string;
  type: LiquidityType;
  user_address: string;
  points_threshold: number;
  bonus_multiplicator: number;
  suppliedOrBorrowed_usd: string;
  points_number: number;
}

type PointsRewardsData = {
  user_address: string;
  points_number: number;
}

let userPoints: Record<string, number> = {};
const historyMarket: MarketSnapshotHistory[] = [];

async function fetchGraphData() {

  const graphQuery =
    `query {
      markets {
        accounts {
          account {
            id
          }
          vTokenBalanceMantissa
          storedBorrowBalanceMantissa
        }
        id
        symbol
        totalSupplyVTokenMantissa
        totalBorrowsMantissa
        underlyingPriceCentsMantissa
        underlyingSymbol
        vTokenDecimals
        underlyingName
        underlyingDecimals
      }
    }`;

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUBGRAPH_API_KEY}`
     },
    body: JSON.stringify({ query: graphQuery })
  });

  const data = await response.json();
  return data.data;
}

async function getPointsRewardFromDb() {

  const { data: existingPoints, error: fetchError } = await sb
    .from('PointsRewards')
    .select('user_address, points_number');

  if (fetchError) {
    console.error('Error when getting data from supabase:', fetchError);
  } else {
    existingPoints.forEach((record: PointsRewardsData) => {
      userPoints[record.user_address] = record.points_number;
    });
  }

  console.log("User points before the snapshot");
  console.log(userPoints);
}

async function calculatePointsRewards(markets: Market[]) {

  markets.forEach(market => {

    const SUPPLY_POINT_THRESHOLD = MARKETS_REWARDS_CONFIGURATIONS[market.id]?.SUPPLY_POINT_THRESHOLD ?? DEFAULT_POINT_THRESHOLD;
    const SUPPLY_BONUS_MULTIPLICATOR = MARKETS_REWARDS_CONFIGURATIONS[market.id]?.SUPPLY_BONUS_MULTIPLICATOR ?? DEFAULT_BONUS_MULTIPLICATOR;
    const BORROW_POINT_THRESHOLD = MARKETS_REWARDS_CONFIGURATIONS[market.id]?.BORROW_POINT_THRESHOLD ?? DEFAULT_POINT_THRESHOLD;
    const BORROW_BONUS_MULTIPLICATOR = MARKETS_REWARDS_CONFIGURATIONS[market.id]?.BORROW_BONUS_MULTIPLICATOR ?? DEFAULT_BONUS_MULTIPLICATOR;

    market.accounts.forEach(acc => {

      const estimatedDailySupplyPointsEarned = createMarketHistoryItem(
        market,
        LiquidityType.SUPPLY,
        acc,
        SUPPLY_POINT_THRESHOLD,
        SUPPLY_BONUS_MULTIPLICATOR
      );

      // const borrowPointsEarned = createMarketHistoryItem(
      //   market,
      //   LiquidityType.BORROW,
      //   acc,
      //   BORROW_POINT_THRESHOLD,
      //   BORROW_BONUS_MULTIPLICATOR
      // );
      const borrowPointsEarned = 0;
      const supplyPointsEarned = Math.max(0,Math.floor(estimatedDailySupplyPointsEarned / 4));
      // Add cumulated points
      if (supplyPointsEarned > 0 || borrowPointsEarned > 0) {
        userPoints[acc.account.id] = (userPoints[acc.account.id] || 0) + supplyPointsEarned + borrowPointsEarned;
      }
    });
  });

  console.log(historyMarket);

  console.log("User points after the snapshot");
  console.log(userPoints);
}

function createMarketHistoryItem(
  market: Market,
  type: LiquidityType,
  accounts: Accounts,
  points_threshold: number,
  bonus_multiplicator: number) {

  const COMPOUND_DECIMALS = 18;

  let historyMarketItem: MarketSnapshotHistory = {
    market_id: market.id,
    symbol: market.symbol,
    type: type,
    user_address: accounts.account.id,
    suppliedOrBorrowed_usd: "",
    points_threshold: points_threshold,
    bonus_multiplicator: bonus_multiplicator,
    points_number: 0
  };

  // Price per token
  const underlyingPriceUSD = new BN(market.underlyingPriceCentsMantissa).dividedBy(10 ** COMPOUND_DECIMALS);

  let pointsEarned = 0;
  let userSupplyOrBorrowInUsd;
  if (type == LiquidityType.SUPPLY) {

    // User supplied tokens
    const userSupplyVToken = new BN(accounts.vTokenBalanceMantissa).dividedBy(10 ** market.vTokenDecimals);
    // Total user supplied price
    userSupplyOrBorrowInUsd = userSupplyVToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();
  }
  else {
    // User borrowed tokens
    const userBorrowVToken = new BN(accounts.storedBorrowBalanceMantissa).dividedBy(10 ** market.underlyingDecimals);
    // Total user borrowed price
    userSupplyOrBorrowInUsd = userBorrowVToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();
  }

  // Calculate supplied or borrowed points
  pointsEarned = Math.floor(userSupplyOrBorrowInUsd / points_threshold) * bonus_multiplicator;

  historyMarketItem.suppliedOrBorrowed_usd = userSupplyOrBorrowInUsd;
  historyMarketItem.points_number = pointsEarned;
  historyMarket.push(historyMarketItem);

  return pointsEarned;
}

async function saveDataToDb() {

  const pointsRewardsData: PointsRewardsData[] = Object.entries(userPoints).map(([user_address, points_number]) => ({
    user_address,
    points_number: points_number,
  }));

  //Save points reward in Database
  const { data, error } = await sb
    .from('PointsRewards')
    .upsert(pointsRewardsData);

  if (error) {
    console.error('Error when saving data: ', error);
    return;
  } else {
    console.log('Data saved successfully: ', data);
  }

  // Save snapshot history in Database
  const { data: d, error: e } = await sb
    .from('HistoryPointsRewards')
    .insert(historyMarket);

  if (e) {
    console.error('Error when saving data: ', e);
    return;
  } else {
    console.log('Data saved successfully: ', d);
  }
}

async function runScript() {
  const data = await fetchGraphData();
  await getPointsRewardFromDb();
  await calculatePointsRewards(data.markets);
  await saveDataToDb();
}

runScript();
const dotenv = require('dotenv').config();
const BN = require('bignumber.js');
const { createClient: createClients } = require('@supabase/supabase-js');

const GRAPHQL_URL = 'https://api.studio.thegraph.com/query/101127/enclabs-isolated-sonic/version/latest';
const sb = createClients(process.env.DB_URL, process.env.DB_API_KEY)
// const sb = createClients(process.env.VITE_DB_URL, process.env.VITE_DB_API_KEY)

type Account = {
  id: string;
};

type Accounts = {
  account: Account;
  vTokenBalanceMantissa: string;
};

type Market = {
  totalSupplyVTokenMantissa: string;
  underlyingName: string;
  underlyingSymbol: string;
  underlyingPriceCentsMantissa: string;
  underlyingDecimals: number;
  vTokenDecimals: number;
  accounts: Accounts[];
}

type MarketSnapshotHistory = {
  name: string;
  symbol: string;
  user_address: string
  supplied_usd: string;
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
        }
        totalSupplyVTokenMantissa
        underlyingPriceCentsMantissa
        underlyingSymbol
        vTokenDecimals
        underlyingName
        underlyingDecimals
      }
    }`;

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

async function calculatePointsRewards(markets: Market[]){

  const COMPOUND_DECIMALS = 18;
  const POINT_THRESHOLD = 100;
  const BONUS_MULTIPLICATOR = 1;

  markets.forEach(market => {

    market.accounts.forEach(acc => {

      let historyMarketItem: MarketSnapshotHistory = {
        name: market.underlyingName,
        symbol: market.underlyingSymbol,
        user_address: "",
        supplied_usd: "",
        points_number: 0
      };

      // Price per token
      const underlyingPriceUSD = new BN(market.underlyingPriceCentsMantissa).dividedBy(10 ** COMPOUND_DECIMALS);
      // User supplied tokens
      const userSupplyVToken = new BN(acc.vTokenBalanceMantissa).dividedBy(10 ** market.vTokenDecimals);
      // Total user supplied price
      const userSupplyInUSD = userSupplyVToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();

      historyMarketItem.user_address = acc.account.id;
      historyMarketItem.supplied_usd = userSupplyInUSD;

      // Calculate points
      const pointsEarned = Math.floor(userSupplyInUSD / POINT_THRESHOLD) * BONUS_MULTIPLICATOR;

      historyMarketItem.points_number = pointsEarned;
      historyMarket.push(historyMarketItem);

      // Add cumulated points
      if (pointsEarned > 0) {
        userPoints[acc.account.id] = (userPoints[acc.account.id] || 0) + pointsEarned;
      }
    });
  });

  console.log(historyMarket);

  console.log("User points after the snapshot");
  console.log(userPoints);
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
  console.log(data);
  await getPointsRewardFromDb();
  await calculatePointsRewards(data.markets);
  await saveDataToDb();
}

runScript();
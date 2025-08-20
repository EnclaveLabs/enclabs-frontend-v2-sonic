require('dotenv').config();
const BigNumber = require('bignumber.js');
const { createClient } = require('@supabase/supabase-js');

const GRAPHQL_ENDPOINT = 'https://gateway.thegraph.com/api/subgraphs/id/Ha7WNTEk2U1MvMUVMmmv8e7uZxJUYY4n8r57iJHYyYcJ';

const supabase = createClient(process.env.DB_URL, process.env.DB_API_KEY)
const COMPOUND_DECIMALS = 18;
const DAYS_PER_YEAR = 365;
const SECONDS_PER_DAY = 60 * 60 * 24;

// Data in DB
type HistoryData = {
    market_name: string;
    market_address: string;
    block_number: string;
    block_timestamp: string;
    supply_apy: string;
    total_supply_token: string;
    total_supply_price_usd: string;
    borrow_apy: string;
    total_borrow_token: string;
    total_borrow_price_usd: string;
    total_liquidity_token: string;
    total_liquidity_price_usd: string;
};

// Data from Subgraph
type FetchedMarketData = {
    id: string;
    name: string;
    symbol: string;
    accrualBlockNumber: number;
    blockTimestamp: number;
    supplyRateMantissa: string;
    totalSupplyVTokenMantissa: string;
    borrowRateMantissa: string;
    totalBorrowsMantissa: string;
    cashMantissa: string;
    underlyingPriceCentsMantissa: string;
    underlyingDecimals:number;
    vTokenDecimals: number;
};

type SupplyBorrowValues = {
    totalSupplyTokens: string;
    totalSupplyInUSD: string;
    totalBorrowTokens: string;
    totalBorrowInUSD: string;
    totalLiquidityTokens: string;
    totalLiquidityInUSD: string;
};

async function fetchGraphQLData() {

    const graphQuery = 
    `query {
        markets {
            id
            name
            symbol
            accrualBlockNumber
            blockTimestamp
            borrowRateMantissa
            supplyRateMantissa
            totalBorrowsMantissa
            totalSupplyVTokenMantissa
            vTokenDecimals
            underlyingPriceCentsMantissa
            underlyingDecimals
            cashMantissa
        }
    }`;

     const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUBGRAPH_API_KEY}`
     },
    body: JSON.stringify({ query: graphQuery })
  });

    const data = await response.json();
    return data.data;
}


const calculateAPY = (
    rateMantissa: string,
    decimals: number = COMPOUND_DECIMALS
    ) =>
    new BigNumber(rateMantissa)
      // Convert mantissa to tokens
      .div(10 ** decimals)
      // Convert to daily rate
      .multipliedBy(SECONDS_PER_DAY * DAYS_PER_YEAR)
      .dp(decimals)
      .multipliedBy(100)
      .toString();

const calculateSupplyBorrowValues = (
    market: FetchedMarketData) : SupplyBorrowValues => {

    // Price per token
    const underlyingPriceUSD = new BigNumber(market.underlyingPriceCentsMantissa).dividedBy(10 ** COMPOUND_DECIMALS);
  

    // Total supplied tokens
    const totalSupplyVToken = new BigNumber(market.totalSupplyVTokenMantissa).dividedBy(10 ** market.vTokenDecimals);
    // Total supplied price
    const totalSupplyInUSD = totalSupplyVToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();


    // Total borrowed tokens
    const totalBorrowVToken = new BigNumber(market.totalBorrowsMantissa).dividedBy(10 ** market.underlyingDecimals);
    // Total borrowed price
    const totalBorrowInUSD = totalBorrowVToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();


    // Total liquidity price
    const totalLiquidityToken = new BigNumber(market.cashMantissa).dividedBy(10 ** market.underlyingDecimals);
    // Total liquidity price
    const totalLiquidityInUSD = totalLiquidityToken.multipliedBy(underlyingPriceUSD).decimalPlaces(market.underlyingDecimals).toString();



    const values: SupplyBorrowValues = {
        totalSupplyTokens: totalSupplyVToken.toString(),
        totalSupplyInUSD: totalSupplyInUSD,
        totalBorrowTokens: totalBorrowVToken.toString(),
        totalBorrowInUSD: totalBorrowInUSD,
        totalLiquidityTokens: totalLiquidityToken.toString(),
        totalLiquidityInUSD: totalLiquidityInUSD,
    };
    return values;
}

async function saveDataToSupabase(markets: FetchedMarketData[]) {

    const historyMarket: HistoryData[] = markets.map(market => {

        const SupplyBorrowValues: SupplyBorrowValues = calculateSupplyBorrowValues(market);
        
        return {
            market_name: market.name,
            market_address: market.id,
            block_number: market.accrualBlockNumber.toString(),
            block_timestamp: market.blockTimestamp.toString(),
            supply_apy: calculateAPY(market.supplyRateMantissa),
            total_supply_token: SupplyBorrowValues.totalSupplyTokens,
            total_supply_price_usd: SupplyBorrowValues.totalSupplyInUSD,
            borrow_apy: calculateAPY(market.borrowRateMantissa),
            total_borrow_token: SupplyBorrowValues.totalBorrowTokens,
            total_borrow_price_usd: SupplyBorrowValues.totalBorrowInUSD,
            total_liquidity_token: SupplyBorrowValues.totalLiquidityTokens,
            total_liquidity_price_usd: SupplyBorrowValues.totalLiquidityInUSD
        };
    });

    // console.log(historyMarket);

    //Save in Database
    const { data, error } = await supabase
        .from('History')
        .insert(historyMarket);

    if (error) {
        console.error('Error when saving data: ', error);
    } else {
        console.log('Data saved successfully: ', data);
    }
}

async function run() {
    const data = await fetchGraphQLData();
    // console.log(data);
    await saveDataToSupabase(data.markets);
}


run();
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const GRAPHQL_ENDPOINT = 'https://api.studio.thegraph.com/query/91097/enclabs-arb-test/version/latest';

const supabase = createClient(process.env.DB_URL, process.env.DB_API_KEY)

// Data in DB
type HistoryData = {
    created_at?: string;
    block_number: string;
    block_timestamp: string;
    borrow_apy: string;
    supply_apy: string;
    total_borrow_cents: string;
    total_supply_cents: string;
    market_address: string;
};

// Data from Subgraph
type FetchedMarketData = {
    id: string;
    name: string;
    symbol: string;
    accrualBlockNumber: number;
    blockTimestamp: number;
    borrowRateMantissa: string;
    supplyRateMantissa: string;
    totalBorrowsMantissa: string;
    totalSupplyVTokenMantissa: string;
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
        }
    }`;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphQuery })
    });

    const data = await response.json();
    return data.data;
}

async function saveDataToSupabase(markets: FetchedMarketData[]) {

    const historyMarket: HistoryData[] = markets.map(market => ({
        market_address: market.id,
        block_number: market.accrualBlockNumber.toString(),
        block_timestamp: market.blockTimestamp.toString(),
        borrow_apy: market.borrowRateMantissa,
        supply_apy: market.supplyRateMantissa,
        total_borrow_cents: market.totalBorrowsMantissa,
        total_supply_cents: market.totalSupplyVTokenMantissa,
    }));

    // Save in Database
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
// Set up a cron job or setInterval here (example every 6 hours)
// setInterval(run, 6 * 60 * 60 * 1000);
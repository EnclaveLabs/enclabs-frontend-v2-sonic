import { Card, Page, Spinner, TextField, Table, TableColumn } from 'components';
import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import config from 'config';
import { useAccountAddress } from 'libs/wallet';
import {
  CartesianGrid,
  Area,
  AreaChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
  Rectangle,
} from 'recharts';
import formatToReadableDate from 'components/charts/ApyChart/formatToReadableDate';
import { useStyles as useSharedStyles } from "components/charts/styles"
import { useStyles as useLocalStyles } from './styles';
import { useUID } from 'react-uid';
import TooltipContent from 'components/charts/TooltipContent';
import { t } from 'i18next';
import React from 'react';
import { theme } from 'theme';


enum LiquidityType {
  SUPPLY = 'SUPPLY',
  BORROW = 'BORROW'
}


type MarketSnapshotHistory = {
  created_at: string;
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
  rank: number,
  user_address: string;
  points_number: number;
}

type HistoryData = {
  date: string;
  total_points_number: number;
  total_usd: number;
  supply_points_number: number;
  borrow_points_number: number;
  supplied_usd: number;
  borrowed_usd: number;
}

const Rewards: React.FC = () => {

  const [currentUserPoints, setCurrentUserPoints] = useState<number>(0);
  const [pointsData, setPointsData] = useState<PointsRewardsData[]>([
    { rank: 0, user_address: '', points_number: 0 },
  ]);
  const [historyData, setHistoryData] = useState<HistoryData[]>();
  const sharedStyles = useSharedStyles();

  const supabase = createClient(config.database.dbUrl, config.database.dbApiKey);
  const { accountAddress } = useAccountAddress();

  useEffect(() => {
    const fetchUserRewardsPoints = async () => {
      try {
        let { data, error } = await supabase
          .from('PointsRewards')
          .select();

        if (error) {
          throw error;
        }
        if (data) {
          const pointsData = data as PointsRewardsData[];
          if (pointsData) {
            pointsData.sort((a, b) => b.points_number - a.points_number);
            pointsData.forEach((user, index) => {
              user.rank = index + 1;
            });

            const slicedPointsData = pointsData.slice(0, 10);

            const userPoints = pointsData.find((item: PointsRewardsData) => item.user_address.toLowerCase() === accountAddress!.toLowerCase());
            if (userPoints) {

              if (userPoints.rank > 10 && userPoints.points_number > 0)
                slicedPointsData.push(userPoints);
              setCurrentUserPoints(userPoints.points_number);
            }

            console.log(slicedPointsData);
            setPointsData(slicedPointsData);
          }
        }

      } catch (error) {
        console.error('Erreur lors de la récupération des points:', error);
      }
    };

    const fetchUserHistoryRewardsPoints = async () => {
      try {
        let { data, error } = await supabase
          .from('HistoryPointsRewards')
          .select()
          // Filters
          .eq('user_address', accountAddress!.toLowerCase());

        if (error) {
          throw error;
        }

        if (data) {

          const groupedByDate: {
            [date: string]: {
              supplyPoints: number;
              suppliedUSD: number;
              borrowPoints: number;
              borrowedUSD: number;
              totalPoints: number;
              totalUSD: number;
            };
          } = {};

          data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          console.log("data");
          console.log(data);
          data.forEach((item:MarketSnapshotHistory) => {
            const date = item.created_at;
            const suppliedOrBorrowedUSD = parseFloat(item.suppliedOrBorrowed_usd);

            if (groupedByDate[date]) {
              if(item.type == LiquidityType.SUPPLY){
                groupedByDate[date].supplyPoints += item.points_number;
                groupedByDate[date].suppliedUSD += suppliedOrBorrowedUSD;
              }
              else{
                groupedByDate[date].borrowPoints += item.points_number;
                groupedByDate[date].borrowedUSD += suppliedOrBorrowedUSD;
              }
              groupedByDate[date].totalPoints += item.points_number;
              groupedByDate[date].totalUSD += suppliedOrBorrowedUSD;
            } else {
              groupedByDate[date] = {
                supplyPoints: item.type == LiquidityType.SUPPLY ? item.points_number : 0,
                suppliedUSD: item.type == LiquidityType.SUPPLY ? suppliedOrBorrowedUSD : 0,
                borrowPoints: item.type == LiquidityType.BORROW ? item.points_number : 0,
                borrowedUSD: item.type == LiquidityType.BORROW ? suppliedOrBorrowedUSD : 0,
                totalPoints: item.points_number,
                totalUSD: suppliedOrBorrowedUSD,
              };
            }
          });

          console.log("groupedByDate");
          console.log(groupedByDate);

          const result = Object.keys(groupedByDate).map((date) => ({
            date,
            total_points_number: groupedByDate[date].totalPoints,
            total_usd: groupedByDate[date].totalUSD,
            supply_points_number: groupedByDate[date].supplyPoints,
            supplied_usd: groupedByDate[date].suppliedUSD,
            borrow_points_number: groupedByDate[date].borrowPoints,
            borrowed_usd: groupedByDate[date].borrowedUSD,
          } as HistoryData));

          setHistoryData(result);
        }

      } catch (error) {
        console.error('Erreur lors de la récupération des points:', error);
      }
    };

    fetchUserRewardsPoints();
    fetchUserHistoryRewardsPoints();
  }, []);

  const columns: TableColumn<PointsRewardsData>[] = useMemo(
    () => [
      {
        key: 'rank',
        label: t('rewards.table.rank'),
        selectOptionLabel: t('rewards.table.rank'),
        align: 'center',
        renderCell: ({ rank, user_address }) =>
          <div className={` ${user_address.toLowerCase() === accountAddress?.toLowerCase() ? 'font-bold text-blue' : ''}`}>
            {rank}
          </div>
      },
      {
        key: 'user_address',
        label: t('rewards.table.address'),
        selectOptionLabel: t('rewards.table.address'),
        align: 'center',
        renderCell: ({ user_address }) =>
          <div className={`wordBreak: 'break-all' ${user_address.toLowerCase() === accountAddress?.toLowerCase() ? 'font-bold text-blue' : ''}`}>
            {user_address}
          </div>,
      },
      {
        key: 'points_number',
        label: t('rewards.table.points'),
        selectOptionLabel: t('rewards.table.points'),
        align: 'center',
        renderCell: ({ points_number, user_address }) =>
          <div className={` ${user_address.toLowerCase() === accountAddress?.toLowerCase() ? 'font-bold text-blue' : ''}`}>
            {points_number}
          </div>
      },
    ],
    [t],
  );

  return (
    <Page indexWithSearchEngines={false}>
      <Card className='flex h-full flex-col justify-center items-center space-y-4 lg:space-y-6 shadow-xl'>
        <div className='text-lg font-semibold'>
          Your rewards:
        </div>
        <div className='text-xl font-bold text-blue'>
          {currentUserPoints} points
        </div>

        <ResponsiveContainer className="min-h-80">
          <BarChart
            data={historyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={value => formatToReadableDate(value)}
              stroke={sharedStyles.accessoryColor}
              tickMargin={sharedStyles.tickMargin}
              style={sharedStyles.axis}
              tickCount={5}
            />
            <YAxis
              dataKey="total_points_number"
              axisLine={false}
              tickLine={false}
              tickFormatter={value => value}
              tickMargin={sharedStyles.tickMargin}
              stroke={sharedStyles.accessoryColor}
              style={sharedStyles.axis}
              tickCount={6} />
            <Tooltip
              isAnimationActive={false}
              cursor={sharedStyles.cursor}
              content={({ payload }) => {
                return payload?.[0] ? (
                  <TooltipContent
                    items={[
                      {
                        label: t('rewards.table.points'),
                        value: (payload[0].payload as HistoryData).total_points_number
                      },
                      {
                        label: 'Supply Points',
                        value: (payload[0].payload as HistoryData).supply_points_number
                      },
                      {
                        label: 'Borrow Points',
                        value: (payload[0].payload as HistoryData).borrow_points_number
                      },
                    ]}
                  />
                ) : null
              }
              }
            />
            <Bar name='Supply Points' dataKey="supply_points_number" radius={[5, 5, 0, 0]} fill={theme.colors.blue} />
            <Bar name='Borrow Points' dataKey="borrow_points_number" radius={[5, 5, 0, 0]} fill={theme.colors.orange} />
            <Legend/>
          </BarChart>
        </ResponsiveContainer>

        <Table
          data={pointsData}
          getTokenAddress={() => ''}
          rowKeyExtractor={row => `rank-points-data`}
          columns={columns}
          className='xxl:shadow-none' />
      </Card>

    </Page >
  );
};

export default Rewards;
/** @jsxImportSource @emotion/react */
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableRow from '@mui/material/TableRow';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormatTo } from 'hooks/useFormatTo';

import { cn } from 'utilities';
import { Card } from '../Card';
import { Spinner } from '../Spinner';
import Head from './Head';
import TableCards from './TableCards';
import { useStyles } from './styles';
import type { Order, TableColumn, TableProps } from './types';
import { Asset, Pool } from 'types';
import { hasAcceptedPoolDisclaimer, isPoolDisclaimed } from 'utilities/disclaimedPools';
import { PoolDisclaimerModal } from 'components/PoolDisclaimer';

export * from './types';

export function Table<R>({
  columns,
  cardColumns,
  data,
  title,
  minWidth,
  initialOrder,
  rowOnClick,
  getRowHref,
  rowKeyExtractor,
  className,
  breakpoint,
  isFetching,
  testId,
  getTokenAddress,
}: TableProps<R>) {
  const styles = useStyles();
  const { formatTo } = useFormatTo();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order<R> | undefined>(initialOrder);
  const [rowClicked, setRowClicked] = useState<R | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const onRequestOrder = (column: TableColumn<R>) => {
    let newOrderDirection: 'asc' | 'desc' = 'desc';

    if (column.key === order?.orderBy.key) {
      newOrderDirection = order?.orderDirection === 'asc' ? 'desc' : 'asc';
    }

    setOrder({
      orderBy: column,
      orderDirection: newOrderDirection,
    });
  };

  const sortedData = useMemo(() => {
    if (!order || !order.orderBy.sortRows) {
      return data;
    }

    return [...data].sort((rowA, rowB) =>
      order.orderBy.sortRows!(rowA, rowB, order.orderDirection),
    );
  }, [data, order]);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, row: R) => {
    setRowClicked(row);
    let authorizedToNavigate = true;
    const poolIsDiclaimed = (row as any).pool?.comptrollerAddress && isPoolDisclaimed(((row as any).pool) as Pool);

    if (poolIsDiclaimed) {
      authorizedToNavigate = hasAcceptedPoolDisclaimer((row as any).pool.comptrollerAddress)
      !authorizedToNavigate && setModalOpen(true);
    }

    if (!authorizedToNavigate) {
      return;
    }

    rowOnClick
      ? rowOnClick(e, row)
      : getRowHref
        ? navigate(formatTo({ to: getRowHref(row) }))
        : undefined
  }

  return (
    <>
      <Card css={styles.getRoot({ breakpoint })} data-testid={testId} className={cn('xxl:shadow-lg', className)}>
        {title && (
          <h4 css={styles.getTitle({ breakpoint })} className="text-lg">
            {title}
          </h4>
        )}

        <MuiTableContainer css={styles.getTableContainer({ breakpoint })}>
          <MuiTable css={styles.table({ minWidth: minWidth ?? '0' })} aria-label={title}>
            <Head
              columns={columns}
              orderBy={order?.orderBy}
              orderDirection={order?.orderDirection}
              onRequestOrder={onRequestOrder}
            />

            {isFetching && (
              <tbody>
                <tr>
                  <td colSpan={columns.length}>
                    <Spinner css={styles.loader} />
                  </td>
                </tr>
              </tbody>
            )}

            <MuiTableBody>
              {sortedData.map((row, rowIndex) => {
                const rowKey = rowKeyExtractor(row);
                const tokenAddress = getTokenAddress(row);

                return (
                  <MuiTableRow
                    hover
                    key={rowKey}
                    css={[
                      styles.link,
                      styles.getTableRow({ clickable: !!getRowHref || !!rowOnClick, tokenAddress: tokenAddress }),
                    ]}
                    onClick={(e) => handleRowClick(e, row)}
                  >
                    {columns.map(column => {
                      const cellContent = column.renderCell(row, rowIndex);
                      const cellTitle = typeof cellContent === 'string' ? cellContent : undefined;

                      return (
                        <MuiTableCell
                          css={styles.cellWrapper}
                          key={`${rowKey}-${column.key}`}
                          title={cellTitle}
                          align={column.align}
                        >
                          {cellContent}
                        </MuiTableCell>
                      );
                    })}
                  </MuiTableRow>
                );
              })}
            </MuiTableBody>
          </MuiTable>
        </MuiTableContainer>

        <TableCards
          data={sortedData}
          isFetching={isFetching}
          rowKeyExtractor={rowKeyExtractor}
          rowOnClick={rowOnClick}
          getRowHref={getRowHref}
          columns={cardColumns || columns}
          breakpoint={breakpoint}
          order={order}
          getTokenAddress={getTokenAddress}
          onOrderChange={setOrder}
        />
      </Card>
      <PoolDisclaimerModal isOpen={modalOpen} onAgree={() => {
        setModalOpen(false);
        getRowHref && navigate(formatTo({ to: getRowHref(rowClicked as R) }));
      }} onClose={() => setModalOpen(false)} poolAddress={(rowClicked as any)?.pool?.comptrollerAddress ?? ''} />
    </>
  );
}



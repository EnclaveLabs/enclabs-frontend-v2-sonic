/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { Spinner } from 'components/Spinner';
import { useFormatTo } from 'hooks/useFormatTo';
import { useTranslation } from 'libs/translations';
import { useNavigate } from 'react-router-dom';

import { Card } from 'components';
import { Delimiter } from '../Delimiter';
import { Select, type SelectOption, type SelectProps } from '../Select';
import { useStyles } from './styles';
import { hasAcceptedPoolDisclaimer, isPoolDisclaimed } from 'utilities/disclaimedPools';
import { PoolDisclaimerModal } from 'components/PoolDisclaimer';
import type { Order, TableProps } from './types';
import { Pool } from 'types';

interface TableCardProps<R>
  extends Pick<
    TableProps<R>,
    | 'data'
    | 'rowKeyExtractor'
    | 'rowOnClick'
    | 'getRowHref'
    | 'breakpoint'
    | 'columns'
    | 'isFetching'
  > {
  order: Order<R> | undefined;
  getTokenAddress: (row: R) => string;
  onOrderChange: (newOrder: Order<R>) => void;
}

export function TableCards<R>({
  data,
  isFetching,
  rowKeyExtractor,
  rowOnClick,
  getRowHref,
  breakpoint,
  columns,
  order,
  getTokenAddress,
  onOrderChange,
}: TableCardProps<R>) {
  const { t } = useTranslation();
  const styles = useStyles();
  const navigate = useNavigate();
  const { formatTo } = useFormatTo();
  const [rowClicked, setRowClicked] = useState<R | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [titleColumn, ...otherColumns] = columns;

  const selectOptions = useMemo(
    () =>
      columns.reduce((acc, column) => {
        if (!column.sortRows) {
          return acc;
        }

        const option: SelectOption = {
          value: column.key,
          label: column.selectOptionLabel,
        };

        return [...acc, option];
      }, [] as SelectOption[]),
    [columns],
  );

  const selectedOption = useMemo(
    () => order && selectOptions.find(option => option.value === order.orderBy.key),
    [order, selectOptions],
  );

  const handleOrderChange: SelectProps['onChange'] = value => {
    const newSelectedOption = selectOptions.find(option => option.value === value);
    const orderBy =
      newSelectedOption && columns.find(column => column.key === newSelectedOption.value);

    if (orderBy) {
      onOrderChange({
        orderBy,
        orderDirection: 'desc',
      });
    }
  };

  return (
    <div css={styles.getCardsContainer({ breakpoint })}>
      {selectOptions.length > 0 && (
        <Select
          label={t('table.cardsSelect.label')}
          placeLabelToLeft
          options={selectOptions}
          value={selectedOption?.value || selectOptions[0].value}
          onChange={handleOrderChange}
          css={styles.cardsSelect}
          variant="tertiary"
        />
      )}

      {isFetching && <Spinner css={styles.loader} />}

      <div>
        {data.map((row, rowIndex) => {
          const rowKey = rowKeyExtractor(row);
          const tokenAddress = getTokenAddress(row);

          const content = (
            <>
              <div css={styles.rowTitleMobile}>{titleColumn.renderCell(row, rowIndex)}</div>

              <Delimiter css={styles.delimiterMobile} />

              <div className="table__table-cards__card-content" css={styles.rowWrapperMobile}>
                {otherColumns.map(column => (
                  <div key={`${rowKey}-${column.key}`} css={styles.cellMobile}>
                    <Typography variant="tiny" css={styles.cellTitleMobile}>
                      {column.label}
                    </Typography>

                    <Typography variant="small2" css={styles.cellValueMobile}>
                      {column.renderCell(row, rowIndex)}
                    </Typography>
                  </div>
                ))}
              </div>
            </>
          );

          const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
            if (rowOnClick) {
              rowOnClick(e, row);
              return;
            }
            if (!getRowHref) {
              return;
            }
            const target = e.target as HTMLElement | null;
            if (target?.closest('a')) {
              return;
            }

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

            navigate(formatTo({ to: getRowHref(row) }));
          };

          return (
            <Card
              key={rowKey}
              css={styles.tableWrapperMobile({ clickable: !!(rowOnClick || getRowHref), tokenAddress: tokenAddress })}
              onClick={handleClick}
              className='shadow-lg'
            >
              <div css={styles.link}>{content}</div>
            </Card>
          );
        })}
      </div>

      <PoolDisclaimerModal isOpen={modalOpen} onAgree={() => {
        setModalOpen(false);
        getRowHref && navigate(formatTo({ to: getRowHref(rowClicked as R) }));
      }} onClose={() => setModalOpen(false)} poolAddress={(rowClicked as any)?.pool?.comptrollerAddress ?? ''} />
    </div>
  );
}

export default TableCards;

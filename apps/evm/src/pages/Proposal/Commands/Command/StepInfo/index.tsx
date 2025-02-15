import { Icon, type IconName } from 'components';
import { useTranslation } from 'libs/translations';
import { useMemo } from 'react';
import { type ProposalCommand, ProposalCommandState } from 'types';
import { cn } from 'utilities';

export type StepInfoProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<
    ProposalCommand,
    | 'chainId'
    | 'state'
    | 'failedExecutionAt'
    | 'canceledAt'
    | 'bridgedAt'
    | 'queuedAt'
    | 'succeededAt'
    | 'executableAt'
    | 'executedAt'
    | 'expiredAt'
  >;

export const StepInfo: React.FC<StepInfoProps> = ({
  chainId,
  state,
  failedExecutionAt,
  canceledAt,
  bridgedAt,
  queuedAt,
  executableAt,
  executedAt,
  expiredAt,
  ...otherProps
}) => {
  const { t } = useTranslation();

  const getStatusColor = () => {
    if (state === ProposalCommandState.Executed) {
      return 'text-green';
    }

    if (state === ProposalCommandState.Canceled || state === ProposalCommandState.Expired) {
      return 'text-red';
    }

    return 'text-lightBlack';
  };

  const getIconName = (): IconName => {
    if (state === ProposalCommandState.Executed) {
      return 'mark';
    }

    if (state === ProposalCommandState.Canceled) {
      return 'close';
    }

    return 'dots';
  };

  const getStatusText = () => {
    if (state === ProposalCommandState.Pending) {
      return t('voteProposalUi.command.status.pending');
    }

    if (state === ProposalCommandState.Bridged) {
      return t('voteProposalUi.command.status.bridged');
    }

    if (state === ProposalCommandState.Canceled) {
      return t('voteProposalUi.command.status.canceled');
    }

    if (state === ProposalCommandState.Queued) {
      return t('voteProposalUi.command.status.queued');
    }

    if (state === ProposalCommandState.Succeeded) {
      return t('voteProposalUi.command.status.succeeded');
    }

    if (state === ProposalCommandState.Executed) {
      return t('voteProposalUi.command.status.executed');
    }

    if (state === ProposalCommandState.Expired) {
      return t('voteProposalUi.command.status.expired');
    }
  };

  const previousStepDate = useMemo(() => {
    if (state === ProposalCommandState.Bridged) {
      return bridgedAt;
    }

    if (state === ProposalCommandState.Canceled) {
      return canceledAt;
    }

    if (state === ProposalCommandState.Queued) {
      return queuedAt;
    }

    if (state === ProposalCommandState.Executed) {
      return executedAt;
    }

    if (state === ProposalCommandState.Expired) {
      return expiredAt;
    }
  }, [state, bridgedAt, canceledAt, queuedAt, executedAt, expiredAt]);

  const nextStepDate = useMemo(() => {
    let tmpNextStepDate: Date | undefined;

    if (state === ProposalCommandState.Bridged) {
      tmpNextStepDate = queuedAt;
    }

    if (state === ProposalCommandState.Queued) {
      tmpNextStepDate = executableAt;
    }

    return tmpNextStepDate;
  }, [state, executableAt, queuedAt]);

  return (
    <div {...otherProps}>
      <div className={cn('flex items-center justify-end gap-x-1', getStatusColor())}>
        <Icon className="text-inherit w-5 h-5" name={getIconName()} />

        <span className="text-sm font-semibold">{getStatusText()}</span>
      </div>

      {state !== ProposalCommandState.Pending && (
        <div className="mt-1 text-xs text-right">
          {previousStepDate && (
            <p className="text-grey">
              {t('voteProposalUi.command.dates.previousStep', { date: previousStepDate })}
            </p>
          )}

          {(state === ProposalCommandState.Bridged || state === ProposalCommandState.Queued) && (
            <p>
              {state === ProposalCommandState.Bridged
                ? t('voteProposalUi.command.dates.queuedIn', {
                    date: nextStepDate,
                  })
                : t('voteProposalUi.command.dates.executableIn', {
                    date: nextStepDate,
                  })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

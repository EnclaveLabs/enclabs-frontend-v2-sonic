'use client';

import { useState } from 'react';
import { Modal } from '../Modal';
import { Checkbox } from '@mui/material';
import { Button } from 'components/Button';
import { setAcceptedPoolDisclaimer } from 'utilities/disclaimedPools';

type PoolDisclaimerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  poolAddress?: string;
};

export function PoolDisclaimerModal({
  isOpen,
  onClose,
  onAgree,
  poolAddress
}: PoolDisclaimerModalProps) {
  const [checked, setChecked] = useState(false);

  const _onAgreee = () => {
    setAcceptedPoolDisclaimer(poolAddress ?? '');
    onAgree();
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onClose}
      noHorizontalPadding
      title={'Risk Disclaimer'}
    >
      <div className="px-4">
        <p>
          You are interacting with the Isolated Sonic Ecosystem Pool.
          This pool may include tokens with low liquidity and oracle feeds based on LP pricing.<br/><br/>
          Despite safeguards such as TWAP, low LTV, and supply/borrow caps, assets in this pool
          may be subject to high volatility and price manipulation, potentially resulting in
          sudden liquidations.
        </p>

        <label className="flex gap-2 items-center mt-4">

          <Checkbox value={checked} onChange={(e) => setChecked(e.target.checked)}/>
          <span> I understand and accept the risks involved.</span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={onClose} variant='secondary'>
            Cancel
          </Button>
           <Button  onClick={_onAgreee}
            disabled={!checked} variant='primary'>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}

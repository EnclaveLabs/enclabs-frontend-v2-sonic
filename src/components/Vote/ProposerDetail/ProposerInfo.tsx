/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reco... Remove this comment to see the full error message
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from 'antd';
import { Card } from 'components/Basic/Card';
import toast from 'components/Basic/Toast';
import { BASE_BSC_SCAN_URL } from '../../../config';

const ProposerInfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: var(--color-bg-primary);
  padding: 25px 40px 28px;

  .address {
    font-size: 17.5px;
    font-weight: 900;
    color: var(--color-text-main);
  }

  span {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  i {
    color: var(--color-text-main);
  }
`;

function ProposerInfo({ address }: $TSFixMe) {
  const handleLink = () => {
    window.open(`${BASE_BSC_SCAN_URL}/address/${address}`, '_blank');
  };
  return (
    <Card>
      <ProposerInfoWrapper className="flex flex-column">
        <div className="address">
          {`${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`}
        </div>
        <div className="flex just-between align-center">
          <span className="highlight pointer" onClick={() => handleLink()}>
            {address}
          </span>
          <CopyToClipboard
            text={address}
            onCopy={() => {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              toast.success({
                title: 'Copied address',
              });
            }}
          >
            <Icon className="pointer copy-btn" type="copy" />
          </CopyToClipboard>
        </div>
      </ProposerInfoWrapper>
    </Card>
  );
}

ProposerInfo.propTypes = {
  address: PropTypes.string,
};

ProposerInfo.defaultProps = {
  address: '',
};

export default compose(withRouter)(ProposerInfo);

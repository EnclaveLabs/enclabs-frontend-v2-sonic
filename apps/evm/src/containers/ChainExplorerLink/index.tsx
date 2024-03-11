import { useMemo } from 'react';

import { type Breakpoint, EllipseAddress } from 'components/EllipseAddress';
import { Icon } from 'components/Icon';
import { Link } from 'containers/Link';
import { useTranslation } from 'libs/translations';
import type { ChainId } from 'types';
import { type UrlType, cn, generateChainExplorerUrl } from 'utilities';

export interface ChainExplorerLinkProps {
  hash: string;
  chainId: ChainId;
  ellipseBreakpoint?: Breakpoint;
  urlType?: UrlType;
  className?: string;
  text?: string;
}

export const ChainExplorerLink: React.FC<ChainExplorerLinkProps> = ({
  hash,
  chainId,
  className,
  urlType,
  text,
  ellipseBreakpoint,
}) => {
  const { t } = useTranslation();

  const url = useMemo(
    () => generateChainExplorerUrl({ hash, urlType, chainId }),
    [hash, urlType, chainId],
  );

  const content = useMemo(() => {
    if (!text) {
      // Extract domain name from URL
      const domainName = new URL(url).hostname.replace('wwww.', '');
      return t('chainExplorerLink.content', { domainName });
    }

    if (text && ellipseBreakpoint) {
      return <EllipseAddress ellipseBreakpoint={ellipseBreakpoint} address={text} />;
    }

    return text;
  }, [url, text, ellipseBreakpoint, t]);

  return (
    <div className={cn('text-blue inline-block text-sm font-semibold', className)}>
      <Link href={url} className="flex items-center">
        {content}

        <Icon name="open" className="ml-2 text-inherit" />
      </Link>
    </div>
  );
};

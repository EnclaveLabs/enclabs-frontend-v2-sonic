import type { SVGProps } from 'react';

const SvgChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="0.5" y="0.5" width="18" height="18" rx="5.5" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.435974 2.18404C0 3.03969 0 4.15979 0 6.4V13.6C0 15.8402 0 16.9603 0.435974 17.816C0.819467 18.5686 1.43139 19.1805 2.18404 19.564C3.03969 20 4.15979 20 6.4 20H13.6C15.8402 20 16.9603 20 17.816 19.564C18.5686 19.1805 19.1805 18.5686 19.564 17.816C20 16.9603 20 15.8402 20 13.6V6.4C20 4.15979 20 3.03969 19.564 2.18404C19.1805 1.43139 18.5686 0.819467 17.816 0.435974C16.9603 0 15.8402 0 13.6 0H6.4C4.15979 0 3.03969 0 2.18404 0.435974C1.43139 0.819467 0.819467 1.43139 0.435974 2.18404ZM16.2071 7.20711C16.5976 6.81658 16.5976 6.18342 16.2071 5.79289C15.8166 5.40237 15.1834 5.40237 14.7929 5.79289L8 12.5858L5.20711 9.79289C4.81658 9.40237 4.18342 9.40237 3.79289 9.79289C3.40237 10.1834 3.40237 10.8166 3.79289 11.2071L7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L12.4571 10.9571L16.2071 7.20711Z"
      fill="#3A78FF"
    />
  </svg>
);

export default SvgChecked;

import BigNumber from 'bignumber.js';

import PLACEHOLDER_KEY from 'constants/placeholderKey';

export interface FormatNumberWithCommasInput {
  value: number | BigNumber | undefined;
  maxDecimals?: number;
  minValue?: number;
  maxValue?: number;
}

const formatNumberWithCommas = ({
  value,
  maxDecimals = 0,
  minValue,
  maxValue,
}: FormatNumberWithCommasInput): string => {
  if (value === undefined) {
    return PLACEHOLDER_KEY;
  }

  const wrappedValue = new BigNumber(value).shiftedBy(-2);

  // Gérer le cas où la valeur est égale à 0
  if (wrappedValue.isEqualTo(0)) {
    return '0';
  }

  const absoluteValue = wrappedValue.absoluteValue();
  const isNegative = wrappedValue.isLessThan(0);

  // Si une valeur maximale est définie et dépassée
  if (maxValue !== undefined && absoluteValue.isGreaterThan(maxValue)) {
    const formattedMax = new BigNumber(maxValue).toFormat(maxDecimals);
    return `${isNegative ? '< -' : '> '}${formattedMax}`;
  }

  // Si une valeur minimale est définie et non atteinte
  if (minValue !== undefined && absoluteValue.isLessThan(minValue)) {
    const formattedMin = new BigNumber(minValue).toFormat(maxDecimals);
    return `< ${formattedMin}`;
  }

  // Formater avec le nombre de décimales spécifié et ajouter les virgules
  const formattedValue = absoluteValue.dp(maxDecimals).toFormat();

  return `${isNegative ? '-' : ''}$${formattedValue}`;
};

export default formatNumberWithCommas;
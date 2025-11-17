import { capitalize, range } from 'lodash';

export const handleValidityLabel = (data: number | string, content: any) =>
  `${data} ${capitalize(content)}${Number(data) > 1 ? 's' : ''}`;

export const getValidityValue = (value: any, key: any) =>
  range(value).map((data) => ({
    value: data,
    label: handleValidityLabel(data, key)
  }));

export const getValidityTableData = (value: any): string => {
  if (value?.years || value?.months) {
    return `${value?.years ? handleValidityLabel(value?.years, 'year') : ''} ${
      value?.months ? handleValidityLabel(value?.months, 'month') : ''
    }`;
  }
  return '-';
};

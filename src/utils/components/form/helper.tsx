// import { Tooltip } from 'antd';

// export const customValidatorForValidityFormItem = () => [
//   ({ getFieldValue }: any) => ({
//     validator() {
//       if (
//         getFieldValue('validity_in_years') === 0 &&
//         getFieldValue('validity_in_months') === 0
//       ) {
//         return Promise.reject(
//           new Error('Please choose a minimum validity of one month')
//         );
//       } else {
//         return Promise.resolve();
//       }
//     }
//   })
// ];

// export const getMultipleModeSelectFieldProps = (tagMoreText: string = '') => ({
//   mode: 'multiple',
//   allowClear: true,
//   maxTagCount: 'responsive',
//   maxTagTextLength: 11,
//   maxTagPlaceholder: (omittedValues: any[]) => (
//     <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
//       <span>
//         +{omittedValues?.length}
//         {tagMoreText ? ` more ${tagMoreText}` : ''}
//       </span>
//     </Tooltip>
//   )
// });

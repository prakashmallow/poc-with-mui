// import React from 'react';

// import { Col, FormInstance, Skeleton } from 'antd';
// import { range } from 'lodash';

// import formsStyle from '@/components/shared/styles/components/forms.module.scss';
// import { displayMessage } from '@/components/shared/utils/helper';

// export const handleOnFinishFailed = (
//   errorFields: Record<any, any>,
//   isFormModal: boolean = false,
//   isBasicInformation?: boolean,
//   values?: Record<any, any>
// ) => {
//   let firstErrorField = '';
//   let fieldElement: HTMLElement | null = null;
//   if (errorFields?.[0]?.name?.length === 1) {
//     firstErrorField = errorFields?.[0]?.name?.[0];
//   } else if (errorFields?.[0]?.name?.length > 1) {
//     for (let index = 0; index < errorFields[0].name.length; index++) {
//       firstErrorField += errorFields[0].name[index];
//       if (index !== errorFields[0].name.length - 1) {
//         firstErrorField += '_';
//       }
//     }
//   }
//   if (isFormModal && firstErrorField) {
//     fieldElement = document.querySelector(
//       `.ant-modal-body #${firstErrorField}`
//     );
//   } else {
//     fieldElement = document.getElementById(firstErrorField);
//   }
//   if (fieldElement?.parentElement?.scrollIntoView) {
//     fieldElement?.parentElement?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center'
//     });
//   }
//   if (
//     isBasicInformation &&
//     errorFields?.length === 1 &&
//     !values?.photo_document
//   ) {
//     displayMessage('error', 'Please add a profile photo', 5);
//   }
// };

// export const handleSkeletonComponent = (
//   rowLength = 1,
//   colLength = 1,
//   spanWidth = 12
// ) => (
//   <>
//     {range(rowLength).map((list) => (
//       <Col span={spanWidth} key={list}>
//         {range(colLength).map((value) => (
//           <React.Fragment key={value}>
//             <div className={formsStyle.skeletonContainer}>
//               <Skeleton.Input size={'small'} className={formsStyle.formLabel} />
//               <Skeleton.Input size={'small'} className={formsStyle.formInput} />
//             </div>
//           </React.Fragment>
//         ))}
//       </Col>
//     ))}
//   </>
// );

export const handleTypeNumberValidate = (e: any) => {
  if (isNaN(e.key) || e.code === 'Space') {
    e.preventDefault();
  }
};

// export const handleTelephoneNumberChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     form: FormInstance
// ) => {
//   const value = e.target.value;
//   if (value.startsWith(' ')) {
//     form.setFieldsValue({ telephone_main: value.trimStart() });
//   }
// };

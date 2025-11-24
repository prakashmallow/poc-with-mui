import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  loading: boolean;
  isFormLoading: boolean;
  isSubDepartmentsStatusLoading: boolean;
  isSubDepartmentsDropdownValuesLoading: boolean;
  submitBtnLoading: boolean;
  isSubDepartmentPresignedPostLoading: boolean;
  isSubDepartmentExportLoading: boolean;
  isSubDepartmentModalVisible: boolean;

  subDepartmentsList: any;
  subDepartmentsFormValues: any | null;
  subDepartmentsDropdownValues: any[];
  isSubDepartmentsFiltersFormOpen: boolean;
  subDepartmentsFiltersFormData: Record<string, any>;
  subDepartmentExcelFileName: string;
  subDepartmentExcelFile: string;
  subDepartmentExportData: any;
  subDepartmentHistoryFormValue: Record<string, any>;
  subDepartmentPaginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
  subDepartmentFilterFormDropDownValue: Record<string, any>;
};

const initialState: InitialStateTypes = {
  loading: false,
  isFormLoading: false,
  isSubDepartmentsStatusLoading: false,
  isSubDepartmentsDropdownValuesLoading: false,
  submitBtnLoading: false,
  isSubDepartmentPresignedPostLoading: false,
  isSubDepartmentExportLoading: false,
  isSubDepartmentModalVisible: false,

  subDepartmentsList: {},
  subDepartmentsFormValues: null,
  subDepartmentsDropdownValues: [],
  isSubDepartmentsFiltersFormOpen: false,
  subDepartmentsFiltersFormData: {},
  subDepartmentExcelFile: '',
  subDepartmentExcelFileName: '',
  subDepartmentExportData: '',
  subDepartmentHistoryFormValue: {},
  subDepartmentPaginationData: { page: 1, size: 25 },
  subDepartmentFilterFormDropDownValue: {}
};

export const subDepartmentsSlice = createSlice({
  name: 'subDepartments',
  initialState: initialState,
  reducers: {
    getSubDepartmentsList: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = true;
    },
    getSubDepartmentsListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.loading = false;
      state.subDepartmentsList = action.payload;
      state.subDepartmentPaginationData = { page, size, pages, total };
    },
    getSubDepartmentsListFailure: (state) => {
      state.loading = false;
      state.subDepartmentsList = {};
    },
    getSubDepartmentsFormValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = true;
    },
    getSubDepartmentsFormValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = false;
      state.subDepartmentsFormValues = action.payload;
    },
    getSubDepartmentsFormValuesFailure: (state) => {
      state.isFormLoading = false;
    },
    postSubDepartmentsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    postSubDepartmentsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('SubDepartment', 'Sub Department')
      );
    },
    postSubDepartmentsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    putSubDepartmentsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    putSubDepartmentsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('SubDepartment', 'Sub Department')
      );
    },
    putSubDepartmentsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    changeSubDepartmentsStatus: (state) => {
      state.loading = true;
      state.isSubDepartmentsStatusLoading = true;
    },
    changeSubDepartmentsStatusSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSubDepartmentsStatusLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('SubDepartment', 'Sub Department')
      );
    },
    changeSubDepartmentsStatusFailure: (state) => {
      state.isSubDepartmentsStatusLoading = false;
    },
    clearSubDepartmentsFormData: (state) => {
      state.subDepartmentsFormValues = null;
    },
    getSubDepartmentsDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSubDepartmentsDropdownValuesLoading = true;
    },
    getSubDepartmentsDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSubDepartmentsDropdownValuesLoading = false;
      state.subDepartmentsDropdownValues =
        action.payload?.map((item) => ({
          ...item,
          label: item.sub_department_name,
          value: item?.id
        })) || [];
    },
    getSubDepartmentsDropdownValuesFailure: (state) => {
      state.isSubDepartmentsDropdownValuesLoading = false;
    },
    clearSubDepartmentsDropdownValues: (state) => {
      state.subDepartmentsDropdownValues = [];
    },
    setIsSubDepartmentsFiltersFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSubDepartmentsFiltersFormOpen = action.payload;
    },
    setSubDepartmentsFiltersFormData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.subDepartmentsFiltersFormData = action.payload.values;
      state.subDepartmentFilterFormDropDownValue =
        action.payload.filterDropdownValue;
    },
    clearSubDepartmentsFormValues: (state) => {
      state.subDepartmentsFormValues = null;
      state.subDepartmentHistoryFormValue = {};
    },
    clearSubDepartmentFilterValue: (state) => {
      state.subDepartmentsList = {};
      state.subDepartmentsFiltersFormData = {};
    },
    setSubDepartmentDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { sub_department } = action.payload;
      state.subDepartmentsDropdownValues =
        sub_department && Object.keys(sub_department).length
          ? [sub_department]
          : [];
    },
    getSubDepartmentExport: (state) => {
      state.isSubDepartmentExportLoading = true;
    },
    getSubDepartmentExportSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSubDepartmentExportLoading = false;
      state.subDepartmentExportData = action.payload;
    },
    getSubDepartmentExportFailure: (state) => {
      state.isSubDepartmentExportLoading = false;
    },
    setSubDepartmentHistoryValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.subDepartmentHistoryFormValue = action.payload;
    },
    setSubDepartmentTablePagination: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      // @ts-ignore
      state.subDepartmentPaginationData = action.payload;
    },
    setSubDepartmentModalVisibility: (state) => {
      state.isSubDepartmentModalVisible = !state.isSubDepartmentModalVisible;
    }
  }
});

export const subDepartmentsActions = subDepartmentsSlice.actions;

export default subDepartmentsSlice.reducer;

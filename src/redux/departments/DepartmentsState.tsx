import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  loading: boolean;
  isFormLoading: boolean;
  isDepartmentsStatusLoading: boolean;
  isDepartmentsDropdownValuesLoading: boolean;
  submitBtnLoading: boolean;
  isDepartmentPresignedPostLoading: boolean;
  isDepartmentExportLoading: boolean;
  isDepartmentModalVisible: boolean;

  departmentsList: any;
  departmentsFormValues: any | null;
  departmentsDropdownValues: any[];
  isDepartmentsFiltersFormOpen: boolean;
  departmentsFiltersFormData: Record<string, any>;
  departmentExcelFileName: string;
  departmentExcelFile: string;
  departmentExportData: any;
  departmentHistoryFormValue: Record<string, any>;
  departmentPaginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
  departmentFilterDropDownValue: Record<string, any>;
};

const initialState: InitialStateTypes = {
  loading: false,
  isFormLoading: false,
  isDepartmentsStatusLoading: false,
  isDepartmentsDropdownValuesLoading: false,
  submitBtnLoading: false,
  isDepartmentPresignedPostLoading: false,
  isDepartmentExportLoading: false,
  isDepartmentModalVisible: false,

  departmentsList: {},
  departmentsFormValues: null,
  departmentsDropdownValues: [],
  isDepartmentsFiltersFormOpen: false,
  departmentsFiltersFormData: {},
  departmentExcelFileName: '',
  departmentExcelFile: '',
  departmentExportData: '',
  departmentHistoryFormValue: {},
  departmentPaginationData: { page: 1, size: 25 },
  departmentFilterDropDownValue: {}
};

export const departmentsSlice = createSlice({
  name: 'departments',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line
    getDepartmentsList: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getDepartmentsListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.loading = false;
      state.departmentsList = action.payload;
      state.departmentPaginationData = { page, size, pages, total };
    },
    getDepartmentsListFailure: (state) => {
      state.loading = false;
      state.departmentsList = {};
    },
    getDepartmentsFormValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = true;
    },
    getDepartmentsFormValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = false;
      state.departmentsFormValues = action.payload;
    },
    getDepartmentsFormValuesFailure: (state) => {
      state.isFormLoading = false;
    },
    postDepartmentsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    postDepartmentsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    postDepartmentsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    putDepartmentsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    putDepartmentsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    putDepartmentsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    changeDepartmentsStatus: (state) => {
      state.loading = true;
      state.isDepartmentsStatusLoading = true;
    },
    changeDepartmentsStatusSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDepartmentsStatusLoading = false;
      displayMessage('success', action.payload);
    },
    changeDepartmentsStatusFailure: (state) => {
      state.isDepartmentsStatusLoading = false;
    },
    clearDepartmentsFormData: (state) => {
      state.departmentsFormValues = null;
      state.departmentHistoryFormValue = {};
    },
    getDepartmentsDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDepartmentsDropdownValuesLoading = true;
    },
    getDepartmentsDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDepartmentsDropdownValuesLoading = false;
      state.departmentsDropdownValues = action.payload?.map(
        ({ id, department_name, division_id }) => ({
          value: id,
          label: department_name,
          division_id
        })
      );
    },
    getDepartmentsDropdownValuesFailure: (state) => {
      state.isDepartmentsDropdownValuesLoading = false;
    },
    clearDepartmentsDropdownValues: (state) => {
      state.departmentsDropdownValues = [];
      state.departmentHistoryFormValue = {};
    },
    setIsDepartmentsFiltersFormOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isDepartmentsFiltersFormOpen = action.payload;
    },
    setDepartmentsFiltersFormData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.departmentsFiltersFormData = action.payload?.values;
      state.departmentFilterDropDownValue = action.payload?.filterDropdownValue;
    },
    setDepartmentsDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { department } = action.payload;
      state.departmentsDropdownValues =
        department && Object.keys(department)?.length ? [department] : [];
    },
    clearDepartmentsFilterValue: (state) => {
      state.departmentsList = {};
      state.departmentsFiltersFormData = {};
    },
    getDepartmentExport: (state) => {
      state.isDepartmentExportLoading = true;
    },
    getDepartmentExportSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDepartmentExportLoading = false;
      state.departmentExportData = action.payload;
    },
    getDepartmentExportFailure: (state) => {
      state.isDepartmentExportLoading = false;
    },
    setDepartmentHistoryValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.departmentHistoryFormValue = action.payload;
    },
    setDepartmentTablePagination: (
      state,
      action: PayloadAction<Record<any, any>>
    ) => {
      // @ts-ignore
      state.departmentPaginationData = action.payload;
    },
    setDepartmentModalVisibility: (state) => {
      state.isDepartmentModalVisible = !state.isDepartmentModalVisible;
    }
  }
});

export const departmentsActions = departmentsSlice.actions;

export default departmentsSlice.reducer;

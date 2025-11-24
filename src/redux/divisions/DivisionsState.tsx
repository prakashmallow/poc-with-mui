import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  loading: boolean;
  isFormLoading: boolean;
  isDivisionStatusLoading: boolean;
  isDivisionsDropdownValuesLoading: boolean;
  submitBtnLoading: boolean;
  isDivisionPresignedPostLoading: boolean;
  isDivisionExportLoading: boolean;
  isDivisionsModalVisible: boolean;

  divisionsList: any;
  divisionsFormValues: any | null;
  divisionsDropdownValues: any[];
  isDivisionsFiltersFormOpen: boolean;
  divisionsFiltersFormData: Record<string, any>;
  divisionExcelFileName: string;
  divisionExcelFile: string;
  divisionExportData: any;
  divisionsHistoryFormValue: Record<string, any>;
  divisionsPaginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
};

const initialState: InitialStateTypes = {
  loading: false,
  isFormLoading: false,
  isDivisionStatusLoading: false,
  isDivisionsDropdownValuesLoading: false,
  submitBtnLoading: false,
  isDivisionPresignedPostLoading: false,
  isDivisionExportLoading: false,
  isDivisionsModalVisible: false,

  divisionsList: {},
  divisionsFormValues: null,
  divisionsDropdownValues: [],
  isDivisionsFiltersFormOpen: false,
  divisionsFiltersFormData: {},
  divisionExcelFileName: '',
  divisionExcelFile: '',
  divisionExportData: '',
  divisionsHistoryFormValue: {},
  divisionsPaginationData: { page: 1, size: 25 }
};

export const divisionsSlice = createSlice({
  name: 'divisions',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line
    getDivisionsList: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getDivisionsListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.loading = false;
      state.divisionsList = action.payload;
      state.divisionsPaginationData = { page, size, pages, total };
    },
    getDivisionsListFailure: (state) => {
      state.loading = false;
      state.divisionsList = {};
    },
    getDivisionsFormValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = true;
    },
    getDivisionsFormValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = false;
      state.divisionsFormValues = action.payload;
    },
    getDivisionsFormValuesFailure: (state) => {
      state.isFormLoading = false;
    },
    postDivisionsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    postDivisionsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    postDivisionsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    putDivisionsFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    putDivisionsFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    putDivisionsFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    changeDivisionStatus: (state) => {
      state.loading = true;
      state.isDivisionStatusLoading = true;
    },
    changeDivisionStatusSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDivisionStatusLoading = false;
      displayMessage('success', action.payload);
    },
    changeDivisionStatusFailure: (state) => {
      state.isDivisionStatusLoading = false;
    },
    getDivisionsDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDivisionsDropdownValuesLoading = true;
    },
    getDivisionsDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDivisionsDropdownValuesLoading = false;
      state.divisionsDropdownValues = action.payload?.map(
        ({ id, division_name }) => ({ label: division_name, value: id })
      );
    },
    getDivisionsDropdownValuesFailure: (state) => {
      state.isDivisionsDropdownValuesLoading = false;
    },
    clearDivisionsDropdownValues: (state) => {
      state.divisionsDropdownValues = [];
    },
    setIsDivisionsFiltersFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isDivisionsFiltersFormOpen = action.payload;
    },
    setDivisionsFiltersFormData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.divisionsFiltersFormData = action.payload;
    },
    clearDivisionFormValues: (state) => {
      state.divisionsFormValues = null;
      state.divisionsHistoryFormValue = {};
    },
    setDivisionsDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { division } = action.payload;
      state.divisionsDropdownValues =
        division && Object.keys(division).length ? [division] : [];
    },
    clearDivisionFilterValue: (state) => {
      state.divisionsList = {};
      state.divisionsFiltersFormData = {};
    },
    getDivisionExport: (state) => {
      state.isDivisionExportLoading = true;
    },
    getDivisionExportSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isDivisionExportLoading = false;
      state.divisionExportData = action.payload;
    },
    getDivisionExportFailure: (state) => {
      state.isDivisionExportLoading = false;
    },
    setDivisionHistoryValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.divisionsHistoryFormValue = action.payload;
    },
    setDivisionTablePagination: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      // @ts-ignore
      state.divisionsPaginationData = action.payload;
    },
    setDivisionsModalVisibility: (state) => {
      state.isDivisionsModalVisible = !state.isDivisionsModalVisible;
    }
  }
});

export const divisionsActions = divisionsSlice.actions;

export default divisionsSlice.reducer;

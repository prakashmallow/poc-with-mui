import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  isSiteDropdownValuesLoading: boolean;
  isAddNewSiteLoading: boolean;
  loading: boolean;
  isFormLoading: boolean;
  isSiteFormDataLoading: boolean;
  isSitesPreSelectedLanguagesLoading: boolean;
  isChangeSiteStatusLoading: boolean;
  submitBtnLoading: boolean;
  isSitesExportLoading: boolean;
  isSitesModalVisible: boolean;

  isSitePresignedPostLoading: boolean;
  sites: any[];
  siteDropdownValues: Record<string, any>;
  newSiteFormData: Record<string, any>;
  sitesList: Record<string, any>;
  siteFormDetails: any | null;
  editSiteId: string;
  sitesPreSelectedLanguages: Array<{ label: string; value: string }>;
  changeSiteStatusLoading: boolean;
  isSitesFiltersFormOpen: boolean;
  sitesFiltersFormData: Record<string, any>;
  siteExcelFileName: string;
  siteExcelFile: string;
  sitesExportData: any | null;
  sitesHistoryFromValue: Record<string, any>;
  paginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
  filterFormDropDownValue?: Record<string, any>;
  generateCodeLoading: boolean;
  generatedCode: any | null;
};

const initialState: InitialStateTypes = {
  isSiteDropdownValuesLoading: false,
  isAddNewSiteLoading: false,
  loading: false,
  isFormLoading: false,
  isSiteFormDataLoading: false,
  isSitesPreSelectedLanguagesLoading: false,
  isChangeSiteStatusLoading: false,
  submitBtnLoading: false,
  isSitesExportLoading: false,
  isSitesModalVisible: false,

  isSitePresignedPostLoading: false,
  sites: [],
  siteDropdownValues: {},
  newSiteFormData: {},
  sitesList: {},
  siteFormDetails: null,
  editSiteId: '',
  sitesPreSelectedLanguages: [],
  changeSiteStatusLoading: false,
  isSitesFiltersFormOpen: false,
  sitesFiltersFormData: {},
  siteExcelFileName: '',
  siteExcelFile: '',
  sitesExportData: '',
  sitesHistoryFromValue: {},
  paginationData: { page: 1, size: 25 },
  filterFormDropDownValue: {},
  generateCodeLoading: false,
  generatedCode: null
};

export const sitesSlice = createSlice({
  name: 'sites',
  initialState: initialState,
  reducers: {
    getSiteDropdownValues: (state) => {
      state.isSiteDropdownValuesLoading = true;
    },
    getSiteDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSiteDropdownValuesLoading = false;
      state.siteDropdownValues = action.payload;
    },
    getSiteDropdownValuesFailure: (state) => {
      state.isSiteDropdownValuesLoading = false;
    },
    // eslint-disable-next-line
    addNewSite: (state, action: PayloadAction<Record<string, any>>) => {
      state.isAddNewSiteLoading = true;
      state.submitBtnLoading = true;
    },
    addNewSiteSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      state.isAddNewSiteLoading = false;
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    addNewSiteFailure: (state) => {
      state.isAddNewSiteLoading = false;
      state.submitBtnLoading = false;
    },
    // eslint-disable-next-line
    updateSite: (state, action: PayloadAction<Record<string, any>>) => {
      state.isAddNewSiteLoading = true;
      state.submitBtnLoading = true;
    },
    updateSiteSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      state.isAddNewSiteLoading = false;
      state.submitBtnLoading = false;
      displayMessage('success', action.payload);
    },
    updateSiteFailure: (state) => {
      state.isAddNewSiteLoading = false;
      state.submitBtnLoading = false;
    },
    // eslint-disable-next-line
    getSitesList: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getSitesListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.loading = false;
      state.sitesList = action.payload;
      state.paginationData = { page, size, pages, total };
    },
    getSitesListFailure: (state) => {
      state.loading = false;
      state.sitesList = {};
    },
    // eslint-disable-next-line
    getSiteFormDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.isFormLoading = true;
    },
    getSiteFormDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.siteFormDetails = action.payload;
      state.isFormLoading = false;
    },
    getSiteFormDetailsFailure: (state) => {
      state.isFormLoading = false;
    },
    getSitesPreSelectedLanguages: (state) => {
      state.isSitesPreSelectedLanguagesLoading = true;
    },
    getSitesPreSelectedLanguagesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSitesPreSelectedLanguagesLoading = false;
      state.sitesPreSelectedLanguages = action.payload?.map(
        ({ description, id }) => ({ label: description, value: id })
      );
    },
    getSitesPreSelectedLanguagesFailure: (state) => {
      state.isSitesPreSelectedLanguagesLoading = false;
    },
    changeSitesStatus: (state) => {
      state.loading = true;
      state.isChangeSiteStatusLoading = true;
    },
    changeSitesStatusSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isChangeSiteStatusLoading = false;
      displayMessage('success', action.payload);
    },
    changeSitesStatusFailure: (state) => {
      state.isChangeSiteStatusLoading = false;
    },
    setIsSitesFiltersFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isSitesFiltersFormOpen = action.payload;
    },
    setSitesFiltersFormData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.sitesFiltersFormData = action.payload.values;
      state.filterFormDropDownValue = action.payload.filterDropdownValue;
    },
    clearSiteFormDetails: (state) => {
      state.siteFormDetails = null;
      state.sitesHistoryFromValue = {};
    },
    clearSitesFilterValue: (state) => {
      state.sitesList = {};
      state.sitesFiltersFormData = {};
    },
    getSitesExport: (state) => {
      state.isSitesExportLoading = true;
    },
    getSitesExportSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isSitesExportLoading = false;
      state.sitesExportData = action.payload;
    },
    getSitesExportFailure: (state) => {
      state.isSitesExportLoading = false;
    },
    setSitesHistoryFromValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.sitesHistoryFromValue = action.payload;
    },
    setSitesTablePagination: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      // @ts-ignore
      state.paginationData = action.payload;
    },
    setSitesModalVisibility: (state) => {
      state.isSitesModalVisible = !state.isSitesModalVisible;
    },
    getSitesGenerateCode: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.generateCodeLoading = true;
    },
    getSitesGenerateCodeSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.generatedCode = action.payload;
      state.generateCodeLoading = false;
    },
    getSitesGenerateCodeFailure: (state) => {
      state.generateCodeLoading = false;
    },
    clearSiteGeneratedCode: (state) => {
      state.generatedCode = null;
    }
  }
});

export const sitesActions = sitesSlice.actions;

export default sitesSlice.reducer;

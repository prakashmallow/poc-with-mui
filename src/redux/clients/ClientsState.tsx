import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  clients: any;
  clientDetails: any;
  loading: boolean;
  clientLoading: boolean;
  paginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
  isCountryDropdownValuesLoading: boolean;
  countryDropdownValues: Record<string, any>;
  clientFilterDropDownValue: any;
  clientDropdownValues: Record<any, any>;
  filtersFormData: Record<any, any>;
  providerSalesManagerDropdownValues: Record<any, any>;
  isProviderSalesManagerDropdownValuesLoading: boolean;
  providerAccountManagerDropdownValues: Record<any, any>;
  isProviderAccountManagerDropdownValuesLoading: boolean;
  isFiltersFormOpen: boolean;
  isDuplicateModalVisible: boolean;
  duplicateClientId: string;
  clientsHistoryFormValue: Record<any, any>;
  isClientDuplicateFailed: boolean;
  isGetSampleExcelFileLoading: boolean;
  isS3UploadAcknowledgmentLoading: boolean;
  clientExcelFileName: string;
  clientExcelFile: any;
  isClientFileHistoryLoading: boolean;
  clientFileHistory: Record<any, any>;
  fileHistoryPaginationData: {
    page: number;
    size: number;
  };
  isGetFileHistoryPresignedURLLoading: boolean;
  fileHistoryPresignedURLData: Record<any, any>;
  isExportClientsDataLoading: boolean;
  exportClientPresignedUrl: string;
  pageLoader: boolean;
  sessionLogoutData: Record<any, any>;
  clientConfigurationsDetails: Record<any, any>;
  isFormLoading: boolean;
};

const initialState: InitialStateTypes = {
  clients: [],
  clientDetails: {},
  loading: false,
  clientLoading: false,
  paginationData: {
    page: 1,
    size: 25,
    total: 0
  },
  isCountryDropdownValuesLoading: false,
  countryDropdownValues: [],
  clientFilterDropDownValue: {},
  clientDropdownValues: {},
  filtersFormData: {},
  providerSalesManagerDropdownValues: [],
  isProviderSalesManagerDropdownValuesLoading: false,
  providerAccountManagerDropdownValues: [],
  isProviderAccountManagerDropdownValuesLoading: false,
  isFiltersFormOpen: false,
  isDuplicateModalVisible: false,
  duplicateClientId: '',
  clientsHistoryFormValue: {},
  isClientDuplicateFailed: false,
  isGetSampleExcelFileLoading: false,
  isS3UploadAcknowledgmentLoading: false,
  clientExcelFileName: '',
  clientExcelFile: {},
  isClientFileHistoryLoading: false,
  clientFileHistory: {},
  fileHistoryPaginationData: { page: 1, size: 25 },
  isGetFileHistoryPresignedURLLoading: false,
  fileHistoryPresignedURLData: {},
  isExportClientsDataLoading: false,
  exportClientPresignedUrl: '',
  pageLoader: false,
  sessionLogoutData: [],
  clientConfigurationsDetails: {},
  isFormLoading: false
};

export const clientsState = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    // eslint-disable-next-line
    getClients: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getClientsSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      const { page, size, pages, total } = action.payload;
      state.clients = action.payload;
      state.loading = false;
      state.paginationData = { page, size, pages, total };
    },
    getClientsFailure: (state) => {
      state.clients = [];
      state.loading = false;
    },
    // eslint-disable-next-line
    getClient(state, action: PayloadAction<Record<string, any>>) {
      state.clientLoading = true;
    },
    getClientSuccess(state, action: PayloadAction<Record<string, any>>) {
      state.clientDetails = action.payload;
      state.clientLoading = false;
    },
    // eslint-disable-next-line
    getClientFailure(state, action: PayloadAction<Record<string, any>>) {
      state.clientDetails = {};
      state.clientLoading = false;
    },
    clearClientDetails(state) {
      state.clientDetails = {};
    },
    getCountryDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isCountryDropdownValuesLoading = true;
    },
    getCountryDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isCountryDropdownValuesLoading = false;
      state.countryDropdownValues = action.payload;
    },
    getCountryDropdownValuesFailure: (state) => {
      state.isCountryDropdownValuesLoading = false;
    },
    clearCountryDropdownValues: (state) => {
      state.countryDropdownValues = [];
    },
    getClientDropdownValues: () => {},
    getClientDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.clientDropdownValues = {
        ...action.payload,
        sectors: action.payload.sectors.filter(
          (item) => item['label'].length > 0 && item['label'] !== 'Non Profit'
        )
      };
    },
    setFiltersFormData: (state, action: PayloadAction<Record<string, any>>) => {
      let remainValue = 2;
      Object.keys(action.payload.formData).forEach(() =>
        action.payload?.availableServices?.length > 0
          ? (remainValue = action.payload?.availableServices?.length + 1)
          : remainValue
      );
      state.filtersFormData = action.payload;
      state.clientFilterDropDownValue = action.payload.filterDropdownValue;
    },
    setClientsTablePagination: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      // @ts-ignore
      state.paginationData = action.payload;
    },
    getProviderSalesManagerDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isProviderSalesManagerDropdownValuesLoading = true;
    },
    getProviderSalesManagerDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isProviderSalesManagerDropdownValuesLoading = false;
      state.providerSalesManagerDropdownValues = action.payload;
    },
    getProviderSalesManagerDropdownValuesFailure: (state) => {
      state.isProviderSalesManagerDropdownValuesLoading = false;
    },
    clearProviderSalesManagerDropdownValues: (state) => {
      state.providerSalesManagerDropdownValues = [];
    },
    getProviderAccountManagerDropdownValues: (
      state,
      //eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isProviderAccountManagerDropdownValuesLoading = true;
    },
    getProviderAccountManagerDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isProviderAccountManagerDropdownValuesLoading = false;
      state.providerAccountManagerDropdownValues = action.payload;
    },
    getProviderAccountManagerDropdownValuesFailure: (state) => {
      state.isProviderAccountManagerDropdownValuesLoading = false;
    },
    clearProviderAccountManagerDropdownValues: (state) => {
      state.providerAccountManagerDropdownValues = [];
    },
    setIsFiltersFormOpen: (state, action: PayloadAction<boolean>) => {
      state.isFiltersFormOpen = action.payload;
    },
    setDuplicateModalVisibility: (state) => {
      state.isDuplicateModalVisible = !state.isDuplicateModalVisible;
    },
    setDuplicateClientId: (state, action: PayloadAction<string>) => {
      state.duplicateClientId = action.payload;
    },
    // eslint-disable-next-line
    clientDuplicate: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    clientDuplicateSuccess: (state) => {
      state.loading = false;
      state.isClientDuplicateFailed = false;
      state.duplicateClientId = '';
      state.isDuplicateModalVisible = false;
    },
    clientDuplicateFailure: (state) => {
      state.loading = false;
      state.isClientDuplicateFailed = true;
    },
    // eslint-disable-next-line
    updateClient: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    updateClientSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { data, formData } = action.payload;
      const {
        cust_interpreting_service,
        cust_ti_service,
        cust_transcription_service,
        cust_vri_service
      } = formData;
      state.loading = false;
      state.clientDetails = {
        ...state.clientDetails,
        cust_transcription_service,
        cust_vri_service,
        cust_ti_service,
        cust_interpreting_service
      };
      // displayMessage('success', data);
    },
    updateClientFailure: (state) => {
      state.loading = false;
    },
    // eslint-disable-next-line
    addNewClient: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    addNewClientSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = false;
      // displayMessage('success', action.payload);
    },
    addNewClientFailure: (state) => {
      state.loading = false;
    },
    setCountryDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { country, address_country } = action.payload;
      if (address_country) {
        state.countryDropdownValues = Object.keys(address_country)?.length
          ? [address_country]
          : [];
      } else {
        state.countryDropdownValues =
          country && Object.keys(country)?.length ? [country] : [];
      }
    },
    setProviderSalesManagerDropdownValues: (state, action) => {
      const { sales_manager } = action.payload;
      state.providerSalesManagerDropdownValues =
        sales_manager && Object.keys(sales_manager)?.length
          ? [sales_manager]
          : [];
    },
    setProviderAccountManagerDropdownValues: (state, action) => {
      const { account_manager } = action.payload;
      state.providerAccountManagerDropdownValues =
        account_manager && Object.keys(account_manager)?.length
          ? [account_manager]
          : [];
    },
    // eslint-disable-next-line
    getSampleExcelFile: (state, action: PayloadAction<Record<string, any>>) => {
      state.isGetSampleExcelFileLoading = true;
    },
    getSampleExcelFileSuccess: (state) => {
      state.isGetSampleExcelFileLoading = false;
    },
    getSampleExcelFileFailure: (state) => {
      state.isGetSampleExcelFileLoading = false;
    },
    // eslint-disable-next-line
    s3Upload: (state, action: PayloadAction<Record<string, any>>) => {},
    s3UploadSuccess: (state) => {
      state.isS3UploadAcknowledgmentLoading = false;
    },
    s3UploadFailure: (state) => {
      state.isS3UploadAcknowledgmentLoading = false;
    },
    s3UploadAcknowledgment: (
      // eslint-disable-next-line
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {},
    s3UploadAcknowledgmentSuccess: (state) => {
      state.isS3UploadAcknowledgmentLoading = false;
    },
    s3UploadAcknowledgmentFailure: (state) => {
      state.isS3UploadAcknowledgmentLoading = false;
    },
    getClientPresignedPost: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isS3UploadAcknowledgmentLoading = true;
      state.clientExcelFileName = action.payload.fileName;
      state.clientExcelFile = action.payload.file;
    },
    getClientPresignedPostSuccess: () => {},
    getClientPresignedPostFailure: (state) => {
      state.isS3UploadAcknowledgmentLoading = false;
    },
    getClientFileHistory: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isClientFileHistoryLoading = true;
    },
    getClientFileHistorySuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isClientFileHistoryLoading = false;
      state.clientFileHistory = {
        ...action.payload,
        items: action.payload.items.map((item, index) => ({
          ...item,
          rowIndex: index
        }))
      };
    },
    getClientFileHistoryFailure: (state) => {
      state.isClientFileHistoryLoading = false;
      state.clientFileHistory = {};
    },
    getFileHistoryPresignedURL: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isGetFileHistoryPresignedURLLoading = true;
    },
    getFileHistoryPresignedURLSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isGetFileHistoryPresignedURLLoading = false;
      state.fileHistoryPresignedURLData = action.payload;
    },
    getFileHistoryPresignedURLFailure: (state) => {
      state.isGetFileHistoryPresignedURLLoading = false;
    },
    // eslint-disable-next-line
    exportClientsData: (state, action: PayloadAction<Record<string, any>>) => {
      state.isExportClientsDataLoading = true;
    },
    exportClientsDataSuccess: (state, action: PayloadAction<string>) => {
      state.isExportClientsDataLoading = false;
      state.exportClientPresignedUrl = action.payload;
    },
    exportClientsDataFailure: (state) => {
      state.isExportClientsDataLoading = false;
    },
    clearClientProfileFormData: (state) => {
      state.clientDetails = {};
      state.clientsHistoryFormValue = {};
    },
    setClientsHistoryFormValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.clientsHistoryFormValue = action.payload;
    },
    getClientSessionLogoutData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.pageLoader = true;
    },
    getClientSessionLogoutDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.sessionLogoutData = action.payload;
    },
    getClientConfigurationsDetails: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.pageLoader = true;
    },
    getClientConfigurationsDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.pageLoader = false;
      state.clientConfigurationsDetails = action.payload;
    },
    getClientConfigurationsDetailsFailure: (state) => {
      state.pageLoader = false;
      state.clientConfigurationsDetails = {};
    },
    updateClientConfigurationsDetails: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = true;
    },
    updateClientConfigurationsDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = false;
      state.clientConfigurationsDetails = action.payload;
    },
    updateClientConfigurationsDetailsFailure: (state) => {
      state.isFormLoading = false;
      state.clientConfigurationsDetails = {};
    }
  }
});

export const clientsActions = clientsState.actions;
export default clientsState.reducer;

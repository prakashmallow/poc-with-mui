import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { displayMessage } from '@/components/shared/utils';

type InitialStateTypes = {
  loading: boolean;
  isBillingAddressDropdownValuesLoading: boolean;
  isFormLoading: boolean;
  isBillingAddressStatusLoading: boolean;
  isCitiesLoading: boolean;
  submitBtnLoading: boolean;
  isBillingAddressExportLoading: boolean;
  isBillingAddressModalVisible: boolean;

  billingAddressList: any;
  billingAddressDropdownValues: any[];
  billingAddressFormValues: any | null;
  isBillingAddressFilterOpen: boolean;
  billingAddressFormData: Record<string, any>;
  cities: any[];
  billingAddressHistoryFormValues: Record<string, any>;
  billingAddressPaginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
};

const initialState: InitialStateTypes = {
  loading: false,
  isBillingAddressDropdownValuesLoading: false,
  isFormLoading: false,
  isBillingAddressStatusLoading: false,
  isCitiesLoading: false,
  submitBtnLoading: false,
  isBillingAddressExportLoading: false,
  isBillingAddressModalVisible: false,

  billingAddressList: {},
  billingAddressDropdownValues: [],
  billingAddressFormValues: null,
  isBillingAddressFilterOpen: false,
  billingAddressFormData: {},
  cities: [],
  billingAddressHistoryFormValues: {},
  billingAddressPaginationData: { page: 1, size: 25 }
};

export const billingAddressSlice = createSlice({
  name: 'billingAddress',
  initialState: initialState,
  reducers: {
    getBillingAddressList: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = true;
    },
    getBillingAddressListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.loading = false;
      state.billingAddressList = action.payload;
      state.billingAddressPaginationData = { page, size, pages, total };
    },
    getBillingAddressListFailure: (state) => {
      state.loading = false;
      state.billingAddressList = {};
    },
    getBillingAddressFormValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = true;
    },
    getBillingAddressFormValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isFormLoading = false;
      state.billingAddressFormValues = action.payload;
    },
    getBillingAddressFormValuesFailure: (state) => {
      state.isFormLoading = false;
    },
    postBillingAddressFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    postBillingAddressFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('BillingAddress', 'Billing Address')
      );
    },
    postBillingAddressFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    putBillingAddressFormData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    putBillingAddressFormDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('BillingAddress', 'Billing Address')
      );
    },
    putBillingAddressFormDataFailure: (state) => {
      state.submitBtnLoading = false;
    },
    // eslint-disable-next-line
    getBillingAddressDropdownValues: (state, action) => {
      state.isBillingAddressDropdownValuesLoading = true;
    },
    getBillingAddressDropdownValuesSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isBillingAddressDropdownValuesLoading = false;
      state.billingAddressDropdownValues = action.payload?.map(
        ({ billing_address_id, billing_address_name }) => ({
          label: billing_address_name,
          value: billing_address_id
        })
      );
    },
    getBillingAddressDropdownValuesFailure: (state) => {
      state.isBillingAddressDropdownValuesLoading = false;
    },
    clearBillingAddressFormValues: (state) => {
      state.billingAddressFormValues = null;
      state.billingAddressHistoryFormValues = {};
    },
    changeBillingAddressStatus: (state) => {
      state.isBillingAddressStatusLoading = true;
    },
    changeBillingAddressStatusSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isBillingAddressStatusLoading = false;
      displayMessage(
        'success',
        action?.payload?.replace('BillingAddress', 'Billing Address')
      );
    },
    changeBillingAddressStatusFailure: (state) => {
      state.isBillingAddressStatusLoading = false;
    },
    setIsBillingAddressFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isBillingAddressFilterOpen = action.payload;
    },
    setBillingAddressFormData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.billingAddressFormData = action.payload;
    },
    getCitiesDropdownValues: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isCitiesLoading = true;
    },
    getCitiesDropdownSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.cities = action.payload.results;
      state.isCitiesLoading = false;
    },
    getCitiesDropdownFailure: (state) => {
      state.isCitiesLoading = false;
    },
    clearBillingAddressDropdownValues: (state) => {
      state.billingAddressDropdownValues = [];
    },
    setBillingAddressDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { billing_address } = action?.payload || {};
      state.billingAddressDropdownValues =
        billing_address && Object.keys(billing_address)
          ? [billing_address]
          : [];
    },
    clearCitiesDropdownValues: (state) => {
      state.cities = [];
    },
    getBillingAddressExport: (state) => {
      state.isBillingAddressExportLoading = true;
    },
    getBillingAddressExportSuccess: (state) => {
      state.isBillingAddressExportLoading = false;
    },
    getBillingAddressExportFailure: (state) => {
      state.isBillingAddressExportLoading = false;
    },
    setBillingAddressCitesDropdownValues: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.cities = [
        {
          address_city_uuid: action.payload.address_city_uuid,
          address_city: action.payload.address_city
        }
      ];
    },
    setBillingAddressHistoryValue: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.billingAddressHistoryFormValues = action.payload;
    },
    setBillingAddressTablePagination: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      // @ts-ignore
      state.billingAddressPaginationData = action.payload;
    },
    setBillingAddressModalVisibility: (state) => {
      state.isBillingAddressModalVisible = !state.isBillingAddressModalVisible;
    },
    clearBillingAddressFilterFormData: (state) => {
      state.billingAddressFormData = {};
    }
  }
});

export const billingAddressActions = billingAddressSlice.actions;
export default billingAddressSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { exportIncompleteStates } from '@/ExportDetails/constant';
// import { handleDownload } from '@/ExportDetails/helper';

export interface InitialStateType {
  globalSearchLoading: boolean;
  globalSearchText: string;
  globalSearchPagination: {
    current_page: number;
    page_items: number;
    total_pages?: number;
  };
  globalSearchData: Record<any, any>[];
  exportsList: Record<any, any>[];
  exportPopoverVisibility: boolean;
}

const initialState: InitialStateType = {
  globalSearchLoading: false,
  globalSearchText: '',
  globalSearchPagination: { current_page: 1, page_items: 25 },
  globalSearchData: [],
  exportsList: [],
  exportPopoverVisibility: false
}

export const sharedDetailsSlice = createSlice({
  name: 'sharedDetails',
  initialState: initialState,
  reducers: {
    getGlobalSearchData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.globalSearchLoading = true;
      state.globalSearchText =
        action.payload.searchText || state.globalSearchText;
    },
    getGlobalSearchDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { data, meta } = action.payload || {};
      const updatedData =
        data?.map((item: any) => {
          const {
            attributes: { auth_uuid, first_name, last_name, ref_string, email }
          } = item;
          return {
            auth_uuid,
            name: `${first_name || ''} ${last_name || ''}`.trim(),
            ref_string: `${ref_string || ''}`,
            email: email || ''
          };
        }) || [];
      state.globalSearchData =
        Number(meta.current_page) === 1
          ? updatedData
          : [...state.globalSearchData, ...updatedData];
      state.globalSearchPagination = meta;
      state.globalSearchLoading = false;
    },
    getGlobalSearchDataFailure: (state) => {
      state.globalSearchLoading = false;
    },
    resetGlobalSearchData: (state) => {
      state.globalSearchLoading = false;
      state.globalSearchText = '';
      state.globalSearchData = [];
      state.globalSearchPagination = { current_page: 1, page_items: 25 };
    },
    getExportDetails: () => {},
    getExportDetailsSuccess: (state, action) => {
      state.exportsList =
        action.payload.map((updatedItem: any) => {
          const initialItem = state.exportsList.find(
            (item) =>
              item?.attributes?.export_ref ===
              updatedItem?.attributes?.export_ref
          );
          // if (
          //   initialItem &&
          //   exportIncompleteStates.includes(
          //     initialItem?.attributes?.export_status
          //   ) &&
          //   updatedItem?.attributes?.export_status === 'Completed'
          // ) {
          //   handleDownload(
          //     updatedItem.attributes?.export_ref,
          //     updatedItem.attributes?.link
          //   );
          // }
          return updatedItem;
        }) || state.exportsList;
    },
    setExportsPopoverVisibility: (state) => {
      state.exportPopoverVisibility = !state.exportPopoverVisibility;
    },
    setExportData: (state, action: PayloadAction<Record<string, any>>) => {
      state.exportsList = [action.payload, ...state.exportsList]
        .filter(
          (item, index, array) =>
            index === array.findIndex((value) => value.id === item.id)
        )
        .slice(0, 5);
      state.exportPopoverVisibility = !state.exportPopoverVisibility;
    }
  }
});

export const sharedDetailsActions = sharedDetailsSlice.actions;

export default sharedDetailsSlice.reducer;

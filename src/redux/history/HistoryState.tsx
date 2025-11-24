import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  isHistoryListLoading: boolean;
  historyList: any;
  paginationData: {
    page: number;
    size: number;
    pages?: number;
    total?: number;
  };
  comparisonDataModalVisibility: boolean;
  isHistoryVersionLoading: boolean;
  historyDetails: null | any;
};

const initialState: initialStateType = {
  isHistoryListLoading: false,
  historyList: {},
  paginationData: { page: 1, size: 25 },
  comparisonDataModalVisibility: false,
  isHistoryVersionLoading: false,
  historyDetails: null
};

export const historySlice = createSlice({
  name: 'history',
  initialState: initialState,

  reducers: {
    // eslint-disable-next-line
    getHistoryList: (state, action: PayloadAction<Record<string, any>>) => {
      state.isHistoryListLoading = true;
    },
    getHistoryListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size, pages, total } = action.payload;
      state.isHistoryListLoading = false;
      state.historyList = {
        ...action.payload,
        items: action.payload.items.map((item, index) => ({
          ...item,
          rowIndex: index
        }))
      };
      state.paginationData = { page, size, pages, total };
    },
    getHistoryListFailure: (state) => {
      state.isHistoryListLoading = false;
    },
    clearHistoryTableData: (state) => {
      state.historyList = {};
    },
    setComparisonDataModalVisibility: (state) => {
      state.comparisonDataModalVisibility =
        !state.comparisonDataModalVisibility;
    },
    setComparisonData: (state, action: PayloadAction<Record<string, any>>) => {
      state.historyDetails = action.payload || null;
    },
    // eslint-disable-next-line
    getHistoryDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.isHistoryVersionLoading = true;
    },
    getHistoryDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isHistoryVersionLoading = false;
      state.historyDetails = action.payload;
    },
    getHistoryDetailsFailure: (state) => {
      state.isHistoryVersionLoading = false;
    }
  }
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;

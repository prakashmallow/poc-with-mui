import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateTypes = {
  loader: boolean;
  consortiums: {
    items: Array<Record<any, any>>;
  };
  consortiumsPaginationData: {
    page: number;
    size: number;
    total?: number;
    pages?: number;
  };
  consortiumsLoading: boolean;
  consortiumModalVisibility: boolean;
  consortiumData: Record<any, any>;
  consortiumLoader: boolean;
  isEdit: boolean;
};

const initialState: InitialStateTypes = {
  loader: false,
  consortiums: {
    items: []
  },
  consortiumsPaginationData: { page: 1, size: 25 },
  consortiumsLoading: false,
  consortiumModalVisibility: false,
  consortiumData: null,
  consortiumLoader: false,
  isEdit: false
};

export const configurationsSlice = createSlice({
  name: 'clientsConfigurations',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line
    getConsortiums: (state, action: PayloadAction<Record<string, any>>) => {
      state.consortiumsLoading = true;
    },
    getConsortiumsSuccess: (state, action: PayloadAction<any>) => {
      const { page, size, total, pages } = action.payload;
      state.consortiums = action.payload;
      state.consortiumsPaginationData = { page, size, total, pages };
      state.consortiumsLoading = false;
    },
    getConsortiumsFailure: (state) => {
      state.consortiumsLoading = false;
    },
    // eslint-disable-next-line
    getConsortium: (state, action: PayloadAction<Record<string, any>>) => {
      state.loader = true;
      state.isEdit = true;
    },
    getConsortiumSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.consortiumData = action.payload;
      state.loader = false;
    },
    getConsortiumFailure: (state) => {
      state.loader = false;
    },
    setConsortiumModalVisibility: (state) => {
      state.consortiumModalVisibility = !state.consortiumModalVisibility;
    },
    setConsortiumData: (state, action: PayloadAction<Record<string, any>>) => {
      state.consortiumData = action.payload || null;
    },
    setConsortiumsTablePagination: (state, action: PayloadAction<any>) => {
      state.consortiumsPaginationData = action.payload;
    },
    // eslint-disable-next-line
    createConsortium: (state, action: PayloadAction<Record<string, any>>) => {
      state.consortiumLoader = true;
    },
    createConsortiumSuccess: (state) => {
      state.consortiumLoader = false;
    },
    createConsortiumFailure: (state) => {
      state.consortiumLoader = false;
    },
    updateConsortium: (state) => {
      state.consortiumLoader = true;
    },
    updateConsortiumSuccess: (state) => {
      state.consortiumLoader = false;
    },
    updateConsortiumFailure: (state) => {
      state.consortiumLoader = false;
    },
    clearConsortiumData: (state) => {
      state.consortiumData = null;
      state.isEdit = false;
    }
  }
});

export const configurationsActions = configurationsSlice.actions;

export default configurationsSlice.reducer;

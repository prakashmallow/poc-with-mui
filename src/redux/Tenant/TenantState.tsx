import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface tenantStateType {
  projectDetailsLoader: boolean;
  projectDetails: Record<string, any>;
}

const initialState: tenantStateType = {
  projectDetailsLoader: true,
  projectDetails: {}
};

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line
    getProjectDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.projectDetailsLoader = true;
    },
    getProjectDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.projectDetails = action.payload || null;
      state.projectDetailsLoader = false;
    },
    getProjectDetailsFailure: (state) => {
      state.projectDetailsLoader = false;
    }
  }
});

export const tenantActions = tenantSlice.actions;

export default tenantSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export type LayoutStateType = {
  isSideMenuCollapsed: boolean;
  isRightSiderCollapsed: boolean;
  rightSiderData: {
    id: number;
    title: string;
    collapseList: {
      key: string;
      title: string;
      data: {
        title: string;
        icon: string;
        key: string;
        date?: string;
        details?: { title?: string; key: string; content: string }[];
      }[];
    }[];
  } | null;
};

const initialState: LayoutStateType = {
  isSideMenuCollapsed: false,
  isRightSiderCollapsed: true,
  rightSiderData: null
};

export const LayoutState = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSideMenuCollapse: (state, action) => {
      state.isSideMenuCollapsed = !!action.payload;
    },
    setRightSiderData: (state, action) => {
      state.rightSiderData = action.payload || null;
    },
    setRightSiderCollapse: (state, action) => {
      state.isRightSiderCollapsed = !!action.payload;
      if (action.payload) {
        state.rightSiderData = null;
      }
    }
  }
});

export const layoutActions = LayoutState.actions;

export default LayoutState.reducer;

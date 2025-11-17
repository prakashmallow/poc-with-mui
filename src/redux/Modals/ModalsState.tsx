import { createSlice } from '@reduxjs/toolkit';

interface ActionConfirmDetails {
  title?: string | null;
  icon?: string | null;
  content?: any | null;
  visible: boolean;
  withoutLoading?: boolean;
  confirmCallback: () => void;
}

export interface ModalsState {
  actionConfirmDetails: ActionConfirmDetails;
  actionConfirmModalLoading: boolean;
  infoModalVisibility: boolean;
  isRequirementsModalVisible: boolean;
  commonFormModalLoading: boolean;
  formModalDetails: {
    title: string | null;
    visible: boolean;
    modalKey: string | null;
    formSubmitCallback: () => void;
  };
}

export const initialState: ModalsState = {
  actionConfirmDetails: {
    title: null,
    icon: null,
    content: null,
    visible: false,
    withoutLoading: false,
    confirmCallback: () => {}
  },
  actionConfirmModalLoading: false,
  infoModalVisibility: false,
  isRequirementsModalVisible: false,
  commonFormModalLoading: false,
  formModalDetails: {
    title: null,
    visible: false,
    modalKey: null,
    formSubmitCallback: () => {}
  },
};

export const ModalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    updateActionConfirmModalDetails: (
      state,
      action: {payload: any} | undefined
    ) => {
      state.actionConfirmDetails = action?.payload || {
        title: null,
        icon: null,
        content: null,
        visible: false,
        withoutLoading: false,
        confirmCallback: () => {}
      };
      state.actionConfirmModalLoading = false;
    },
    setActionConfirmModalLoading: (state) => {
      state.actionConfirmModalLoading = !state.actionConfirmModalLoading;
    },
    setInfoModalVisibility: (state) => {
      state.infoModalVisibility = !state.infoModalVisibility;
    },
    setRequirementsModalVisible: (state) => {
      state.isRequirementsModalVisible = !state.isRequirementsModalVisible;
    },
    updateFormModalDetails: (state, action: {payload: any} | undefined) => {
      state.formModalDetails = action?.payload || {
        title: null,
        visible: false,
        modalKey: null,
        formSubmitCallback: () => {}
      };
      state.commonFormModalLoading = false;
    },
    updateFormSubmitLoading: (state) => {
      state.commonFormModalLoading = !state.commonFormModalLoading;
    }
  }
});

export const modalActions = ModalsSlice.actions;
export default ModalsSlice.reducer;
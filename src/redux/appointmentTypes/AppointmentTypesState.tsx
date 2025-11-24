import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateTypes = {
  isAppointmentTypesModalVisible: boolean;
  isDeleteModalVisible: boolean;
  isInfoModalVisible: boolean;
  appointmentTypesEditData: Record<any, any> | null;
  loading: boolean;
  submitBtnLoading: boolean;
  formLoading: boolean;
  qualificationLevels: Record<any, any>[];
  securityClearanceLevels: Record<any, any>[];
  tablePaginationData: { page: number; size: number };
  appointmentTypesList: Record<string, any>;
  deletedAppointmentTypesList: Record<any, any>[];
  bookingData: Record<string, any>;
  setDeleteAppointmentId: string;
};

const initialState: InitialStateTypes = {
  isAppointmentTypesModalVisible: false,
  isDeleteModalVisible: false,
  isInfoModalVisible: false,
  appointmentTypesEditData: null,
  loading: false,
  submitBtnLoading: false,
  formLoading: false,
  qualificationLevels: [],
  securityClearanceLevels: [],
  tablePaginationData: { page: 1, size: 25 },
  appointmentTypesList: {},
  deletedAppointmentTypesList: [],
  bookingData: {},
  setDeleteAppointmentId: ''
};

export const appointmentTypesSlice = createSlice({
  name: 'appointmentTypes',
  initialState: initialState,
  reducers: {
    setAppointmentTypesModalVisibility: (state) => {
      state.isAppointmentTypesModalVisible =
        !state.isAppointmentTypesModalVisible;
    },
    setDeleteModalVisibility: (state) => {
      state.isDeleteModalVisible = !state.isDeleteModalVisible;
    },
    setInfoModalVisibility: (state) => {
      state.isInfoModalVisible = !state.isInfoModalVisible;
    },
    setAppointmentTypesEditData: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.appointmentTypesEditData = action.payload;
    },
    // eslint-disable-next-line
    getLevels: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getLevelsSuccess: (state, action: PayloadAction<Record<string, any>>) => {
      const {
        data: { qualification_levels, security_clearance_levels }
      } = action.payload;
      if (qualification_levels) {
        state.qualificationLevels = qualification_levels;
      }
      if (security_clearance_levels) {
        state.securityClearanceLevels = security_clearance_levels;
      }
    },
    getLevelsFailure: (state) => {
      state.loading = false;
    },
    getAppointmentTypesList: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = true;
    },
    getAppointmentTypesListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { page, size } = action.payload;
      state.loading = false;
      state.appointmentTypesList = {
        ...action.payload,
        items: action.payload.items.map((data) => ({
          ...data,
          qualifications_level: state.qualificationLevels.find(
            (level) => level.value === data?.qualification_level_uuid
          )?.label,
          security_clearances_level: state.securityClearanceLevels.find(
            (level) => level.value === data?.security_clearance_level_uuid
          )?.label
        }))
      };
      state.tablePaginationData = { page, size };
    },
    getAppointmentTypesListFailure: (state) => {
      state.loading = false;
      state.appointmentTypesList = {};
      state.tablePaginationData = { page: 1, size: 25 };
    },
    createAppointmentTypes: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    createAppointmentTypesSuccess: (state) => {
      state.submitBtnLoading = false;
    },
    createAppointmentTypesFailure: (state) => {
      state.submitBtnLoading = false;
    },
    updateAppointmentTypes: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    updateAppointmentTypesSuccess: (state) => {
      state.submitBtnLoading = false;
    },
    updateAppointmentTypesFailure: (state) => {
      state.submitBtnLoading = false;
    },
    getAppointmentTypesEditData: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.formLoading = true;
    },
    getAppointmentTypesEditDataSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { name } = action.payload;
      state.appointmentTypesEditData = action.payload;
      state.formLoading = false;
      state.deletedAppointmentTypesList = [
        ...state.deletedAppointmentTypesList,
        { label: name, value: name }
      ];
    },
    getAppointmentTypesEditDataFailure: (state) => {
      state.formLoading = false;
    },
    updateAppointmentTypesStatus: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = true;
    },
    updateAppointmentTypesStatusSuccess: (state) => {
      state.loading = false;
    },
    updateAppointmentTypesStatusFailure: (state) => {
      state.loading = false;
    },
    getDeletedAppointmentTypesList: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.formLoading = true;
    },
    getDeletedAppointmentTypesListSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      const { response, isFromEdit } = action.payload;
      if (response.length > 0) {
        state.deletedAppointmentTypesList = [
          ...response,
          { label: 'Other', value: 'other' }
        ];
      } else {
        state.deletedAppointmentTypesList = [];
      }
      state.formLoading = isFromEdit || false;
    },
    getDeletedAppointmentTypesListFailure: (state) => {
      state.formLoading = false;
    },
    getBookingsDetails: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
      state.setDeleteAppointmentId = action.payload.id;
    },
    getBookingsDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = false;
      state.bookingData = action.payload;
    },
    getBookingsDetailsFailure: (state) => {
      state.loading = false;
    },
    deleteAppointmentTypes: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.submitBtnLoading = true;
    },
    deleteAppointmentTypesSuccess: (state) => {
      state.submitBtnLoading = false;
    },
    deleteAppointmentTypesFailure: (state) => {
      state.submitBtnLoading = false;
    }
  }
});

export const appointmentTypesActions = appointmentTypesSlice.actions;

export default appointmentTypesSlice.reducer;

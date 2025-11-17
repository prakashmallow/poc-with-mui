import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateType {
  isAuthenticated: boolean;
  userDetails: Record<string, any>;
  loading: boolean;
  turnstileSize: string;
  signupInviteLoading: boolean;
  formLoading: boolean;
  commonPasswords: Record<string, any>;
  staffLinguistPermissions: string[];
  staffClientsAdminPermissions: string[];
  isClientServiceAccess: boolean;
  credentials: Record<any, any>;
}

const initialState: initialStateType = {
  isAuthenticated: false,
  userDetails: {},
  loading: true,
  turnstileSize: 'invisible',
  signupInviteLoading: false,
  formLoading: false,
  commonPasswords: [],
  staffLinguistPermissions: [],
  isClientServiceAccess: true,
  credentials: {},
  staffClientsAdminPermissions: []
};

export const AuthState = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // eslint-disable-next-line
    getAutherize: (state, action: PayloadAction<Record<string, any>>) => {
      state.loading = true;
    },
    getAutherizeSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isAuthenticated = true;
      state.userDetails = action.payload;
      state.staffLinguistPermissions =
        action.payload?.permissions?.staff?.linguists || [];
      state.staffClientsAdminPermissions =
        action.payload?.permissions?.staff?.client_admin || [];
      state.isClientServiceAccess =
        process.env.NEXT_PUBLIC_CLIENT_SERVICE_DISABLED !== 'true';
    },
    getAutherizeFailure: (state) => {
      state.isAuthenticated = false;
      state.userDetails = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // eslint-disable-next-line
    getTokens: (state, action: PayloadAction<Record<string, any>>) => {},
    // eslint-disable-next-line
    getTokensSuccess: (state, action: PayloadAction<Record<string, any>>) => {},
    // eslint-disable-next-line
    getTokensFailure: (state, action: PayloadAction<Record<string, any>>) => {
      state.userDetails = {};
      state.loading = false;
    },
    // eslint-disable-next-line
    getRefreshToken: (state, action: PayloadAction<Record<string, any>>) => {},
    getRefreshTokenSuccess: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.isAuthenticated = true;
    },
    getRefreshTokenFailure: (state) => {
      state.userDetails = {};
      state.isAuthenticated = false;
      state.loading = false;
    },
    getCSInitDetails: (
      // eslint-disable-next-line
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {},
    getCSInitDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = false;
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    getCSInitDetailsFailure: (state) => {
      state.loading = false;
    },
    getLinguistInitDetails: (
      // eslint-disable-next-line
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {},
    getLinguistInitDetailsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.loading = false;
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    getLinguistInitDetailsFailure: (state) => {
      state.loading = false;
    },
    updateLinguistPassword: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.signupInviteLoading = true;
    },
    updateLinguistPasswordSuccess: (
      state,
      // eslint-disable-next-line
      action: PayloadAction<Record<string, any>>
    ) => {
      state.signupInviteLoading = false;
    },
    updateLinguistPasswordFailure: (state) => {
      state.signupInviteLoading = false;
      state.turnstileSize = 'normal';
    },
    getCommonPasswords: (state) => {
      state.formLoading = true;
    },
    getCommonPasswordsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.commonPasswords = action.payload;
      state.formLoading = false;
    },
    getCommonPasswordsFailure: (state) => {
      state.formLoading = false;
    },
    updateLinguistProfileDetails: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    getCredentials: () => {},
    getCredentialsSuccess: (
      state,
      action: PayloadAction<Record<string, any>>
    ) => {
      state.credentials = action.payload;
    },
    getVRIUserMe: (state) => {
      state.loading = true;
    },
    getVRIUserMeSuccess: (state, action: PayloadAction<Record<any, any>>) => {
      state.loading = false;
      state.userDetails = {
        ...state.userDetails,
        ...action.payload
      };
    },
    getVRIUserMeFailure: (state) => {
      state.loading = false;
    }
  }
});

export const authActions = AuthState.actions;
export default AuthState.reducer;

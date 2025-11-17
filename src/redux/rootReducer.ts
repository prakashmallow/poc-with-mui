import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/Auth/AuthState';
import sharedDetailsReducer from '@/redux/SharedDetails/SharedDetailsState';
import modalsReducer from '@/redux/Modals/ModalsState';
import layoutReducer from '@/redux/Layout/LayoutState';
import tenantReducer from '@/redux/Tenant/TenantState';

const rootReducer = combineReducers({
  auth: authReducer,
  sharedDetails: sharedDetailsReducer,
  modals: modalsReducer,
  layout: layoutReducer,
  tenant: tenantReducer,
});

export default rootReducer;
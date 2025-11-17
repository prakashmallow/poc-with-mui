export const tokens: string[] = [
  'auth_access_token',
  'auth_id_token',
  'auth_refresh_token',
  'access_token_pkce',
  'id_token_pkce',
  'refresh_token_pkce'
];

export const publicRoutes: string[] = [
  '/linguist/signup',
  '/invite/set-password',
  '/linguist/giving-reference',
  '/linguist/signup-success-info',
  '/auth_login_callback',
  '/auth/redirect',
  '/login',
  '/'
];

export const unauthorizedRoutes: string[] = [
  '/auth/redirect',
  '/linguist/signup',
  '/linguist/giving-reference',
  '/email-confirmation',
  '/invite/set-password',
  '/'
];

export const basePathNames = {
  onboarding: '/linguist/onboarding',
  profile: '/linguist/profile',
  linguistUnavailability: '/linguist/unavailability',
  linguistList: '/staff/linguists',
  staffLinguist: '/staff/linguists/',
  createLinguist: '/staff/linguist/create-new',
  linguistHistory: {
    historyBasePath: '/staff/linguists/[linguistId]/history',
    historyVersionBasePath: '/[historyId]',
    basicInformation: '/basic-information',
    services: '/services',
    securityClearances: '/security-clearances',
    documentation: '/documentation',
    bankDetails: '/bank-details',
    trainingAndMemberships: '/training-and-memberships',
    preferences: '/preferences',
    agreement: '/agreement',
    contentPaths: [
      'basic-information',
      'services',
      'security-clearances',
      'documentation',
      'bank-details',
      'training-and-memberships',
      'preferences',
      'agreement'
    ]
  },
  linguistsConfigurations: {
    configurationsList: '/staff/configurations/linguists',
    contractHistory:
      '/staff/configurations/linguists/contracts/[contractId]/history',
    resourcesList: '/staff/configurations/linguists/resources',
    resourcesMultilingual:
      '/staff/configurations/linguists/resources/multilingual-resources',
    resourcesUpdates: '/staff/configurations/linguists/resources/updates',
    resourcesInformation:
      '/staff/configurations/linguists/resources/information',
    resourcesGuidelinesTraining:
      '/staff/configurations/linguists/resources/guidelines-and-training'
  },
  linguistResources: {
    path: '/linguist/resources',
    resourcesMultilingual: '/linguist/resources/multilingual-resources',
    resourcesUpdates: '/linguist/resources/updates',
    resourcesInformation: '/linguist/resources/information',
    resourcesGuidelinesTraining: '/linguist/resources/guidelines-and-training'
  },
  emailConfirmation: '/email-confirmation',
  vri: {
    vriBasepath: '/interpreter-view',
    staff: {
      active_calls: '/active-calls',
      pending_calls: '/pending-calls',
      completed_calls: '/completed-calls',
      scheduled_calls: '/scheduled-calls',
      on_demand_calls: '/on-demand-calls',
      support_calls: '/support-calls'
    },
    linguist: {
      new_calls: '/',
      active_calls: '/active-calls',
      pending_calls: '/pending-calls',
      completed_calls: '/completed-calls',
      test_room: '/test-room'
    },
    client_user: {
      new_calls: '/',
      active_calls: '/active-calls',
      pending_calls: '/pending-calls',
      completed_calls: '/completed-calls',
      test_room: '/test-room'
    }
  },
  ti: {
    tiBasepath: '/operator-screen'
  }
};

export const linguistPermissionSlugs = {
  sections: {
    service: {
      view: 'staff_linguists_services_view',
      edit: 'staff_linguists_services_edit'
    },
    security_clearance: {
      view: 'staff_linguists_security_clearances_view',
      edit: 'staff_linguists_security_clearances_edit'
    },
    documentation: {
      view: 'staff_linguists_documentations_view',
      edit: 'staff_linguists_documentations_edit'
    },
    bank: {
      view: 'staff_linguists_bank_details_view',
      edit: 'staff_linguists_bank_details_edit'
    },
    membership: {
      view: 'staff_linguists_training_and_memberships_view',
      edit: 'staff_linguists_training_and_memberships_edit'
    }
  },
  deRegisterAndReRegisterLinguist: 'staff_linguists_deregister_and_reregister',
  resetLinguistPassword: 'staff_linguists_reset_pwd',
  moveLinguistApprovalOrPendingApproval:
    'staff_linguists_move_to_approved_or_pending_approval',
  inviteLinguist: 'staff_linguists_invite',
  createLinguist: 'staff_linguists_create',
  assignLinguistToStaff: 'staff_linguists_assign_to_staff',
  accessLinguistExport: 'staff_linguists_access_exports',
  removeLinguist: 'staff_linguists_remove',
  editLinguist: 'staff_linguists_edit',
  viewLinguist: 'staff_linguists_view',
  assignToStaff: 'staff_linguists_assign_to_staff'
};

export const maxUploadLimit = 50;

export const formValidateMessages = {
  required: 'Please enter ${label}, you cannot skip this field',
  whitespace: '${label} cannot be empty',
  types: {
    email: 'Please enter the email ID in a valid format. Ex.paul@gmail.com',
    number: '${label} is not a valid ${type}!'
  },
  string: {
    max: '${label} is too long. Please limit to ${max} characters.',
    len: '${label} should be ${len} characters',
    min: 'Minimum ${min} characters needed for ${label}'
  },
  number: {
    max: '${label} should be less than or equal to ${max}',
    len: '${label} should be ${len} characters',
    min: '${label} should be less than or equal to ${min}'
  }
};

export const requestPayloadDateFormat: string = 'YYYY-MM-DD';

export const dateFormat: string = 'DD/MM/YYYY';

export const dateTimeFormat: string = 'DD/MM/YYYY HH:mm';

export const dateTimeFormatWithSeconds: string = 'DD/MM/YYYY HH:mm:ss';

export const dateTime12HrFormat: string = 'DD/MM/YYYY h:mm A';

export const dateTime12HrFormatWithSeconds: string = 'DD/MM/YYYY h:mm:ss A';

export const requiredAllMandatorySectionsMessage: string =
  'Please update all mandatory sections to proceed.';

export const selectFieldSearchProps = {
  showSearch: true,
  optionFilterProp: 'children',
  filterOption: (input: any, option: any) =>
    (option?.children ?? '').toLowerCase().includes(input?.toLowerCase()),
  allowClear: true
};

export const mockProjectDetails = {
  name: 'Dals',
  logo_url: 'https://prestaging.assets.dals.co.uk/dals/public/logo-dals.svg',
  favicon_url: 'https://prestaging.assets.dals.co.uk/dals/public/FavIcon.png',
  header_img_url:
    'https://prestaging.assets.dals.co.uk/dals/public/bg-gradient-banner-header-secondary-1.png',
  bg_img_url:
    'https://prestaging.assets.dals.co.uk/dals/public/bg1-gradient-grey.png',
  secondary_bg_img_url:
    'https://prestaging.assets.dals.co.uk/dals/public/bg-gradient-ls-blue.png',
  sample_data: {
    country: 'United Kingdom',
    county: 'Manchester',
    postal_code: 'YO26 6RW',
    location: '123 high street Berkshire, United Kingdom',
    email: 'paulallen@cardio.co.uk',
    contact_number: '+441619282533'
  },
  theme: {
    custom_css_variables: {
      primary_color: '#14A073',
      primary_light_color: '#e6ffeb',
      secondary_color: '#1e285f',
      secondary_light_color: '#e6fafa',
      neutral_dark_color: '#656961',
      neutral_medium_color: '#bec2b9',
      neutral_light_color: '#f0efeb',
      background_color: '#ffffff',
      info_color: '#1e285f',
      info_light_color: '#e6fafa',
      success_color: '#14A073',
      success_light_color: '#E6FFEB',
      warning_color: '#DE881F',
      warning_light_color: '#FFEFDB',
      danger_color: '#D63D2F',
      danger_light_color: '#FFEAE8'
    }
  },
  font_details: {
    primary_font_family: 'Public Sans',
    primary_font_url:
      'https://prestaging.assets.dals.co.uk/dals/public/public_sans/public-sans.css',
    header_font_family: 'Bressay Display',
    header_font_url:
      'https://prestaging.assets.dals.co.uk/dals/public/bressay/bressay-display.css'
  }
};

export const dropDownSearchPlaceHolder: string =
  'Enter more than 3 characters to search';

export const alphanumericCharactersRule: { pattern: RegExp; message: string } =
  {
    pattern: /^[A-Za-z0-9]+$/,
    message: 'Only alphanumeric characters are allowed'
  };

export const numbersNotAllowedRule: { pattern: RegExp; message: string } = {
  pattern: /^([^0-9]*)$/,
  message: 'Numbers not allowed'
};

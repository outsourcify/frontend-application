import { PrimeIcons } from 'primevue/api';

// List of menu items
// Named by menu key - will can be reused in each role
export const DASHBOARD = {
  key: 'dashboard',
  relatedKeys: ['dashboard'],
  title: 'Dashboard',
  caption: '',
  icon: PrimeIcons.HOME,
  to: { name: 'index' },
};

export const SETTINGS_ACCOUNT = {
  key: 'account',
  relatedKeys: ['account'],
  title: 'Account',
  caption: 'All user accounts in the system',
  to: { name: 'settings-account' },
  icon: PrimeIcons.USERS,
};

export const SETTINGS_GLOBAL_SETTINGS = {
  key: 'global-settings',
  relatedKeys: ['global-settings'],
  title: 'Global Settings',
  caption: 'Settings that apply to the system and set initial default values',
  to: { name: 'settings-global-settings' },
  icon: PrimeIcons.COG,
};

export const SETTINGS_HOLIDAYS_CALENDAR = {
  key: 'holidays-calendar',
  relatedKeys: ['holidays-calendar'],
  title: 'Holidays Calendar',
  caption: 'Online booking system for management of holiday',
  to: { name: 'settings-holidays-calendar' },
  icon: PrimeIcons.CALENDAR_PLUS,
};

export const SETTINGS_EMAIL_TEMPLATES = {
  key: 'email-templates',
  relatedKeys: ['email-templates'],
  title: 'Email Templates',
  caption:
    'An email template is an HTML file composed of reusable code modules',
  to: { name: 'settings-email-templates' },
  icon: PrimeIcons.ENVELOPE,
};

export const SETTINGS = {
  key: 'settings',
  relatedKeys: ['settings'],
  title: 'Settings',
  caption: '',
  icon: PrimeIcons.COG,
  to: { name: 'settings-account' },
  children: [
    SETTINGS_ACCOUNT,
    SETTINGS_GLOBAL_SETTINGS,
    SETTINGS_HOLIDAYS_CALENDAR,
    SETTINGS_EMAIL_TEMPLATES,
  ],
};

export const AGENCY = {
  key: 'agencies',
  relatedKeys: ['agencies'],
  title: 'Agency',
  caption: 'All agencies in the system',
  icon: PrimeIcons.BUILDING,
  to: { name: 'agencies' },
};

export const AGENCY_USER = {
  key: 'agency-users',
  relatedKeys: ['agency-users'],
  title: 'Agency Users',
  caption: 'The users that belong to the agency',
  icon: PrimeIcons.USERS,
  to: { name: 'agency-users' },
};

export const SETTINGS_AGENCY = {
  ...SETTINGS,
  children: [AGENCY, AGENCY_USER],
};

export default {
  DASHBOARD,
  SETTINGS_ACCOUNT,
  SETTINGS_GLOBAL_SETTINGS,
  SETTINGS_HOLIDAYS_CALENDAR,
  SETTINGS_EMAIL_TEMPLATES,
  SETTINGS,
  AGENCY,
  AGENCY_USER,
  SETTINGS_AGENCY,
};

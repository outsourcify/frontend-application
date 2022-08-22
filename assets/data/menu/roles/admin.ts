import { PrimeIcons } from 'primevue/api';
import { Menu } from '~~/types/utils/menu';

const menu: Menu[] = [
  {
    key: 'dashboard',
    relatedKeys: ['dashboard'],
    title: 'Dashboard',
    caption: '',
    icon: PrimeIcons.HOME,
    to: { name: 'index' },
    children: [],
  },
  {
    key: 'settings',
    relatedKeys: ['settings-agencies'],
    title: 'Settings',
    caption: '',
    icon: PrimeIcons.COG,
    to: { name: 'settings-agencies' }, // use first child route as default
    children: [
      {
        key: 'settings-agencies',
        relatedKeys: ['settings-agencies'],
        title: 'Agency',
        caption: 'All agencies in the system',
        icon: PrimeIcons.BUILDING,
        to: { name: 'settings-agencies' },
      },
      {
        key: 'settings-agency-users',
        relatedKeys: ['settings-agency-users'],
        title: 'Agency Users',
        caption: 'The users that belong to the agency',
        icon: PrimeIcons.USERS,
        to: { name: 'settings-agency-users' },
      },
    ],
  },
];

export default menu;

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
];

export default menu;

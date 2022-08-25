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
    key: 'geography',
    relatedKeys: ['geography'],
    title: 'Geography',
    caption: '',
    icon: PrimeIcons.MAP,
    to: { name: 'geography-countries' },
    children: [
      {
        key: 'geography-countries',
        relatedKeys: ['geography-countries'],
        title: 'Countries',
        caption:
          'A distinct territorial body, a state, nation, or other political entity.',
        icon: PrimeIcons.GLOBE,
        to: { name: 'geography-countries' },
      },
      {
        key: 'geography-regions',
        relatedKeys: ['geography-regions'],
        title: 'Regions',
        caption: 'World regions in the SDG framework of the United Nations',
        icon: PrimeIcons.MAP_MARKER,
        to: { name: 'geography-regions' },
      },
      {
        key: 'geography-destinations',
        relatedKeys: ['geography-destinations'],
        title: 'Destinatinos',
        caption: 'The place where someone is going or where something is being sent or taken',
        icon: PrimeIcons.BOOKMARK,
        to: { name: 'geography-destinations' },
      },
    ],
  },
];

export default menu;

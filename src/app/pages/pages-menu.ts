import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Virtual Machines',
    icon: 'nb-list',
    link: '/pages/virtual-machines',
    home: true,
  },
  {
    title: 'Reservations',
    icon: 'nb-edit',
    children: [
      {
        title: 'Create Reservation',
        icon: 'nb-compose',
        link: '/pages/reservation',
      },
      {
        title: 'Reservations',
        icon: 'nb-list',
        link: '/pages/list_reservations',
        // home: true,
      },
    ],
  },
  {
    title: 'Statistics',
    icon: 'nb-bar-chart',
    link: '/pages/stats',
  },
];

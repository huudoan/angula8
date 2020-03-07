import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'DASHBOARD',
    icon: '',
    link: '/home/dashboard',
    home: true,
  },
  {
    title: 'ASK_THE_EXPERT',
    icon: 'people-outline',
    link: '/home/questions',
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
];


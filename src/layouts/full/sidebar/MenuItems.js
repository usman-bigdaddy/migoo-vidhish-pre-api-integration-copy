import {
  IconHome,
  IconBook,
  IconListCheck,
  IconMessage,
  IconHeadphones,
  IconVocabulary,
  IconAward,
  IconTrophy,
  IconSettings,
  IconHelp,
} from '@tabler/icons-react';

const Menuitems = [
  // {
  //   subheader: 'Main',
  //   i18n: 'menu.homeHeader',
  // },
  {
    id: 'dashboard',
    title: 'Dashboard',
    i18n: 'menu.dashboard',
    icon: IconHome,
    href: '/dashboard',
  },
  {
    id: 'reading',
    title: 'Reading',
    i18n: 'menu.reading',
    icon: IconBook,
    href: '/reading',
  },
  {
    id: 'sentence-completion',
    title: 'Sentence Completion',
    i18n: 'menu.sentenceCompletion',
    icon: IconListCheck,
    href: '/sentence-completion',
  },
  {
    id: 'restatements',
    title: 'Restatements',
    i18n: 'menu.restatements',
    icon: IconMessage,
    href: '/restatements',
  },
  {
    id: 'listening-test',
    title: 'Listening Test',
    i18n: 'menu.listeningTest',
    icon: IconHeadphones,
    href: '/listening-test',
  },
  {
    id: 'word-bank',
    title: 'Word Bank',
    i18n: 'menu.wordBank',
    icon: IconVocabulary,
    href: '/word-bank',
  },
  // {
  //   subheader: 'User',
  //   i18n: 'menu.userHeader',
  // },
  {
    id: 'english-test',
    title: 'English Test',
    i18n: 'menu.englishTest',
    icon: IconAward,
    href: '/english-test',
  },
  {
    id: 'leaderboard',
    title: 'Leaderboard',
    i18n: 'menu.leaderboard',
    icon: IconTrophy,
    href: '/leaderboard',
  },
  {
    id: 'achievements',
    title: 'Achievements',
    i18n: 'menu.achievements',
    icon: IconAward,
    href: '/achievements',
  },
  // {
  //   subheader: 'Settings',
  //   i18n: 'menu.settingsHeader',
  // },
  {
    id: 'settings',
    title: 'Settings',
    i18n: 'menu.settings',
    icon: IconSettings,
    href: '/settings',
  },
  {
    id: 'help',
    title: 'Help',
    i18n: 'menu.help',
    icon: IconHelp,
    href: '/help',
  },
];

export default Menuitems;


// import { uniqueId } from 'lodash';
// import { Button, Box, Typography } from '@mui/material';
// import { Link } from 'react-router';

// import {
//   IconLayoutDashboard, 
//   IconSettings,
//   IconHelp,
//   IconHome,
//   IconBook,
//   IconDeviceLaptop,
//   IconFileInvoice,
//   IconHeadphones,
//   IconSortAZ,
//   IconTextGrammar,
//   IconMedal,
// } from '@tabler/icons-react';


// const Menuitems = [
//   {
//     navlabel: true,
//     subheader: 'Home',
//   },

//   {
//     id: uniqueId(),
//     title: 'Dashboard',
//     icon: IconHome,
//     href: '/dashboard',
//   },
//   {
//     id: uniqueId(),
//     title: 'Reading',
//     icon: IconBook,
//     href: '/reading',
//   },
//   {
//     id: uniqueId(),
//     title: 'Sentence Completion',
//     icon: IconDeviceLaptop,
//     href: '/sentence-completion',
//   },
//   {
//     id: uniqueId(),
//     title: 'Restatements',
//     icon: IconFileInvoice,
//     href: '/restatements',
//   },
//   {
//     id: uniqueId(),
//     title: 'Listening Test',
//     icon: IconHeadphones,
//     href: '/listening-test',
//   },
//   {
//     id: uniqueId(),
//     title: 'Word Bank',
//     icon: IconSortAZ,
//     href: '/word-bank',
//   },
//   {
//     id: uniqueId(),
//     title: 'English Test',
//     icon: IconTextGrammar,
//     href: '/english-test',
//   },
//   {
//     id: uniqueId(),
//     title: 'Leaderboard',
//     icon: IconMedal,
//     href: '/leaderboard',
//   },
//   {
//     id: uniqueId(),
//     title: 'Achievements',
//     icon: IconLayoutDashboard,
//     href: '/achievements',
//   },
//   {
//     id: uniqueId(),
//     title: 'Settings',
//     icon: IconSettings,
//     href: '/settings',
//   },
//   {
//     id: uniqueId(),
//     title: 'Help',
//     icon: IconHelp,
//     href: '/help',
//   }
// ];

// export default Menuitems;

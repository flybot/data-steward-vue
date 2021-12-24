export default {
    en: {
      name: 'English',
      load: () => { return import('./en.json'); },
    },
    ua: {
      name: 'Українська',
      load: () => { return import('./ua.json'); },
    },
  };
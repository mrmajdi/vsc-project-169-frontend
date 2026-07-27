// @vsc repo:vsc-project-169-frontend file:src/i18n.ts task:f2-src-i18n-ts module:frontend session:169
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa.json';

i18next
  .use(initReactI18next)
  .init({
    lng: 'fa',
    fallbackLng: 'fa',
    debug: false,
    resources: {
      fa: {
        translation: fa,
      },
    },
  });

if (typeof document !== 'undefined') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'fa';
}

export default i18next;

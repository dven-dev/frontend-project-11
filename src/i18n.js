import i18next from 'i18next';
import ru from './locales/ru.js';
import * as yup from 'yup';

const initI18n = async () => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  yup.setLocale({
    string: {
      url: () => i18n.t('feedback.errors.url'),
    },
    mixed: {
      required: () => i18n.t('feedback.errors.required'),
      notOneOf: () => i18n.t('feedback.errors.duplicate'),
    },
  });

  return i18n;
};

export default initI18n;

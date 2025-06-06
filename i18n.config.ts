import en from "./i18n/locales/en.json";
import fr from "./i18n/locales/fr.json";

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'fr',
  messages: { fr, en }
}))

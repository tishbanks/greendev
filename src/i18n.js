import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import statique des traductions
import fr from './locales/fr/translation.json'
import en from './locales/en/translation.json'
import es from './locales/es/translation.json'
import ja from './locales/ja/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      ja: { translation: ja }
    },
    lng: 'fr',              // langue par défaut
    fallbackLng: 'fr',      // si une clé est manquante
    interpolation: {
      escapeValue: false    // pas nécessaire avec React
    }
  })

export default i18n

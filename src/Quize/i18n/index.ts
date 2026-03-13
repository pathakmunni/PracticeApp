import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as RNLocalize from "react-native-localize"

import en from "../locales/content_en.json"
import ar from "../locales/content_ar.json"

const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  }
}

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales()
    callback(locales[0]?.languageCode || "en")
  },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
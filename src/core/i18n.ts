import i18n, {TranslationOptions} from 'i18next'

const translation = {
}

type Translation = typeof translation
type TranslationKeys = keyof Translation

const instance = create()

export function translate<TResult = any,
  TValues extends object = object,
  TKeys extends TranslationKeys = TranslationKeys>
(key: TKeys | TKeys[], options?: TranslationOptions<TValues>): TResult {
  return instance.t(key, options)
}

function create() {
  return i18n.init({
    lng: 'en',
    keySeparator: false,
    resources: {
      en: {
        translation,
      },
    },
  })
}

import i18n, {TranslationOptions} from 'i18next'

const translation = {
  'filter.field.dataCheckIn': 'Data de check in',
  'filter.field.dataCheckOut': 'Data de check out',
  'validation.fieldMandatory': '{{label}} obrigatório(a)',
  'validation.dateInvalid': '{{label}} deve ser uma data no formato YYYY-MM-DD',
  'validation.dateShouldBeBeforeAnother': '{{begin}} deve ser antes da {{end}}',
  'validation.dateShouldBeTodayOrAfterToday': '{{label}} deve ser hoje ou depois de hoje',
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

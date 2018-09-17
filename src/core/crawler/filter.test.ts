import {DateTime} from 'luxon'
import {Filter, validateFilter} from './filter'

describe('validateFilter', () => {
  let filter: Filter = null
  const year = DateTime.local().year + 1

  describe('valid', () => {
    test('check out one day after check in', () => {
      filter = {
        dataCheckIn: `${year}-01-01`,
        dataCheckOut: `${year}-01-02`,
      }
      const errors = validateFilter(filter)
      expect(errors).toHaveLength(0)
    })

    test('check out two days after check in', () => {
      filter = {
        dataCheckIn: `${year}-01-01`,
        dataCheckOut: `${year}-01-03`,
      }
      const errors = validateFilter(filter)
      expect(errors).toHaveLength(0)
    })

    test('check out one month one day after check in', () => {
      filter = {
        dataCheckIn: `${year}-01-01`,
        dataCheckOut: `${year}-02-02`,
      }
      const errors = validateFilter(filter)
      expect(errors).toHaveLength(0)
    })

    test('check out one year one day after check in', () => {
      filter = {
        dataCheckIn: `${year}-01-01`,
        dataCheckOut: `${year + 1}-01-02`,
      }
      const errors = validateFilter(filter)
      expect(errors).toHaveLength(0)
    })
  })

  describe('invalid', () => {
    test('empty filter', () => {
      filter = {
        dataCheckIn: null,
        dataCheckOut: null,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in obrigatório(a)',
        'Data de check out obrigatório(a)',
      ])
    })

    test('date time', () => {
      filter = {
        dataCheckIn: `${year}-01-01T15:53:00`,
        dataCheckOut: `${year}-02-02`,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in deve ser uma data no formato YYYY-MM-DD',
      ])
    })

    test('invalid date value', () => {
      filter = {
        dataCheckIn: `${year}-33-01`,
        dataCheckOut: `${year}-01-02`,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in deve ser uma data no formato YYYY-MM-DD',
      ])
    })

    test('check in same as check out', () => {
      filter = {
        dataCheckIn: `${year}-01-01`,
        dataCheckOut: `${year}-01-01`,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in deve ser antes da Data de check out',
      ])
    })

    test('check in after check out', () => {
      filter = {
        dataCheckIn: `${year}-01-02`,
        dataCheckOut: `${year}-01-01`,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in deve ser antes da Data de check out',
      ])
    })

    test('check in before today', () => {
      filter = {
        dataCheckIn: DateTime.local().minus({days: 1}).toISODate(),
        dataCheckOut: `${year}-01-01`,
      }
      const errors = validateFilter(filter)
      expect(errors).toEqual([
        'Data de check in deve ser hoje ou depois de hoje',
      ])
    })
  })
})

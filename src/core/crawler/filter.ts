import {DateTime} from 'luxon'
import {translate} from '../i18n'

export type Filter = {
  dataCheckIn: string,
  dataCheckOut: string,
}

export function validateFilter(filter: Filter): string[] {
  const errors = [
    ...validateDate(filter.dataCheckIn, translate('filter.field.dataCheckIn')),
    ...validateDate(filter.dataCheckOut, translate('filter.field.dataCheckOut')),
  ]
  if (!errors.length) {
    errors.push(
      ...validateCheckInBeforeCheckOut(filter),
      ...validateCheckInAfterOrEqualToday(filter),
    )
  }
  return errors
}

function validateDate(date: string, label: string): string[] {
  if (date == null) {
    return [translate('validation.fieldMandatory', {label})]
  }
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)) {
    return [translate('validation.dateInvalid', {label})]
  }
  if (!DateTime.fromISO(date).isValid) {
    return [translate('validation.dateInvalid', {label})]
  }
  return []
}

function validateCheckInBeforeCheckOut(filter: Filter): string[] {
  const checkInDate = DateTime.fromISO(filter.dataCheckIn)
  const checkOutDate = DateTime.fromISO(filter.dataCheckOut)

  if (checkOutDate.diff(checkInDate, 'days').days <= 0) {
    return [translate('validation.dateShouldBeBeforeAnother', {
      begin: translate('filter.field.dataCheckIn'),
      end: translate('filter.field.dataCheckOut'),
    })]
  }
  return []
}


function validateCheckInAfterOrEqualToday(filter: Filter): string[] {
  const checkInDate = DateTime.fromISO(filter.dataCheckIn)
  const today = DateTime.local()

  if (checkInDate.diff(today, 'days').days < 0) {
    return [translate('validation.dateShouldBeTodayOrAfterToday', {
      label: translate('filter.field.dataCheckIn'),
    })]
  }
  return []
}

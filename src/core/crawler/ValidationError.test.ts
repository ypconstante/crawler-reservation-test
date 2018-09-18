import {ValidationError} from '../ValidationError'

describe('constructor', () => {
  test('handle single error', () => {
    const error = new ValidationError(['error'])
    expect(error.errors).toHaveLength(1)
    expect(Object.isFrozen(error.errors)).toBeTruthy()
  })
  test('handle multiple errors', () => {
    const error = new ValidationError(['error', 'another'])
    expect(error.errors).toHaveLength(2)
    expect(Object.isFrozen(error.errors)).toBeTruthy()
  })
  test('fail on null object', () => {
    const t = () => new ValidationError(null)
    expect(t).toThrow(Error);
  })
  test('fail on empty array', () => {
    const t = () => new ValidationError([])
    expect(t).toThrow(Error);
  })
})

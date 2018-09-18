export class ValidationError extends Error {
  public errors: ReadonlyArray<string>

  constructor(errors: string[]) {
    if (errors.length === 0) {
      throw new Error('errors cannot be empty')
    }
    super(`ValidationError: ${errors.join(', ')}`)
    this.errors = Object.freeze(errors)
  }
}

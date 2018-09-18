import {Browser, launch, Page} from 'puppeteer'
import {Filter, validateFilter} from '../filter'
import {Crawler} from '../Crawler'
import {ValidationError} from '../../ValidationError'

export abstract class AbstractCrawler<T> implements Crawler<T> {
  private extractionRunning: boolean
  private browser: Browser

  constructor(protected filter: Filter,
              protected page?: Page) {
  }

  async extractData(): Promise<T[]> {
    try {
      if (this.extractionRunning) {
        throw new Error('object already running a data extraction, create a new crawler')
      }
      this.extractionRunning = true

      const errors = validateFilter(this.filter)
      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      await this.createPage()
      await this.goToPage()
      return await this.extractDataFromPage()
    } finally {
      if (this.browser) {
        await this.browser.close()
      }
      this.extractionRunning = false
    }
  }

  async createPage() {
    if (!this.page) {
      this.browser = await launch()
      this.page = await this.browser.newPage()
    }
    return this.page
  }

  async goToPage() {
    await this.page.goto(this.getUrl())
  }

  abstract getUrl(): string

  async extractDataFromPage(): Promise<T[]> {
    await this.contentLoaded()
    const errors = await this.getErrors() || []
    if (errors.length > 0) {
      throw new ValidationError(errors)
    }

    return this.extractContent()
  }

  abstract contentLoaded(): Promise<any>

  abstract getErrors(): Promise<string[]>

  abstract extractContent(): Promise<T[]>
}

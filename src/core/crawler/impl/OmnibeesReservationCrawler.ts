import {AbstractCrawler} from './AbstractCrawler'
import {ReservationData} from '../ReservationData'
import {Filter} from '../filter'
import {DateTime} from 'luxon'

const baseUrl = 'https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation#/&diff=false&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-'

function dateToUrlParam(dateString: string) {
  return DateTime.fromISO(dateString).toFormat('ddMMyyyy')
}

export class OmnibeesReservationCrawler extends AbstractCrawler<ReservationData> {
  getUrl(): string {
    return baseUrl + `&CheckIn=${dateToUrlParam(this.filter.dataCheckIn)}&CheckOut=${dateToUrlParam(this.filter.dataCheckOut)}`
  }

  async contentLoaded(): Promise<any> {
    await this.page.waitForSelector('#preloader', {hidden: true})
    await this.page.waitForSelector('#rooms_results')
  }

  async getErrors(): Promise<string[]> {
    /* istanbul ignore next */
    const error = await this.page.evaluate(() => {
      const errorElement = document.querySelector('.noResults .info-message h2')
      return errorElement ? errorElement.textContent : null
    })
    return Promise.resolve(error ? [error] : [])
  }

  extractContent(): Promise<ReservationData[]> {
    /* istanbul ignore next */
    return this.page.$$eval(
      '#rooms_results .roomName',
      (elements) => {
        return Promise.all(elements.map(e => ({
          nome: e.querySelector('h5').textContent,
          descricao: e.querySelector('.description').textContent,
          preco: Number.parseFloat(e.querySelector('h6.bestPriceTextColor').textContent.replace('R$', '').replace(',', '.')),
          imagens: Array.from(e.querySelectorAll('.slide a')).map((img: HTMLAnchorElement) => img.href),
        })))
      },
    )
  }
}

export const extractOmnibeesReservationData = (filter: Filter) => new OmnibeesReservationCrawler(filter).extractData()


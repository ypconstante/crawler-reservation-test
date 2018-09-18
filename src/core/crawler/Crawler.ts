import {Filter} from './filter'

export type Crawler<T> = {
  extractData(filter: Filter): Promise<T[]>
}

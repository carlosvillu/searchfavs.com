import DataSource from '../../DataSource'

export default class TwitterDataSource extends DataSource {

  statuses () {
    throw new Error('[TwitterDataSource#statuses] must be implemented')
  }

  favorites () {
    throw new Error('[TwitterDataSource#favorites] must be implemented')
  }
}

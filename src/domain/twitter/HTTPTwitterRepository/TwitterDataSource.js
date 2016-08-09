import DataSource from '../../DataSource'

export default class TwitterDataSource extends DataSource {
  favorites () {
    throw new Error('[TwitterDataSource#favorites] must be implemented')
  }
}

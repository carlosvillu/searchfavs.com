import TwitterRepository from '../TwitterRepository'

export default class HTTPTwitterRepository extends TwitterRepository {
  constructor ({dataSource, log} = {}) {
    super({dataSource, log})

    this._dataSource = dataSource
    this._log = log
  }
  favorites ({token, secret}) {
    this._log('Getting favorites from %s', this._dataSource)
    this._dataSource.favorites({token, secret})
  }
}

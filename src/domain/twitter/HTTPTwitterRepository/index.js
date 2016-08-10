import TwitterRepository from '../TwitterRepository'

export default class HTTPTwitterRepository extends TwitterRepository {
  constructor ({dataSource, log} = {}) {
    super({dataSource, log})

    this._dataSource = dataSource
    this._log = log
  }

  token ({token} = {}) {
    this._token = token
    return this
  }

  secret ({secret} = {}) {
    this._secret = secret
    return this
  }

  favorites () {
    this._log('Getting favorites from %s', this._dataSource)
    return this._dataSource.favorites({token: this._token, secret: this._secret})
  }

  statuses ({track}) {
    this._log('Getting statuses from %s', this._dataSource)
    return this._dataSource.statuses({token: this._token, secret: this._secret, track})
  }
}

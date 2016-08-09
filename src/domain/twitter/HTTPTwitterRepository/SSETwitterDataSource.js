import TwitterDataSource from './TwitterDataSource'

export default class SSETwitterDataSource extends TwitterDataSource {

  static get FAV_EVENT () { return 'fav' }

  constructor ({eventSource, config, rx, log}) {
    super({config, rx, log})

    this._log = log
    this._rx = rx
    this._eventSource = eventSource
    this._config = config
  }

  favorites ({token, secret}) {
    const api = this._config.get('api')
    this._log('open SS connection with %s using token %s and secret %s', api, token, secret)
    const source = new this._eventSource(`${api}/favs?token=${token}&secret=${secret}`)
    source.addEventListener(SSETwitterDataSource.FAV_EVENT, (evt) => {
      const data = JSON.parse(evt.data)
      this._log('Fav %j', data)
    }, false)
  }

}

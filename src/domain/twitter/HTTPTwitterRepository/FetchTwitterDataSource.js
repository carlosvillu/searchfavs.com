import TwitterDataSource from './TwitterDataSource'

export default class FetchTwitterDataSource extends TwitterDataSource {
  constructor ({log, config} = {}) {
    super({log, config})

    this._log = log
    this._fetcher = window.fetch
    this._config = config
  }

  favorites ({token, secret}) {
    const url = `${this._config.get('api')}/favs?token=${token}&secret=${secret}`
    this._log(`Getting favorites from ${url}`)
    return window.fetch(url)
            .then(resp => resp.json())
            .catch(err => this._log('Error: %j', err))
  }
}

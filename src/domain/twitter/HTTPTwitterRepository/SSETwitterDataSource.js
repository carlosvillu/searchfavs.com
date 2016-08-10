import TwitterDataSource from './TwitterDataSource'

export default class SSETwitterDataSource extends TwitterDataSource {

  static get FAV_EVENT () { return 'tweet' }
  static get ERR_EVENT () { return 'error' }

  constructor ({eventSource, config, rx, log}) {
    super({config, rx, log})

    this._log = log
    this._rx = rx
    this._eventSource = eventSource
    this._config = config
  }

  // How to use this method in a componet
  // const subscription = statuses$.subscribe(
  //   twt => this.setState({ status: [].concat(this.state.status).concat([twt]) }),
  //   err => this._log('Status err %j', err)
  // )
  // setTimeout(() => subscription.dispose(), 5000)
  statuses ({token, secret, track}) {
    const api = this._config.get('api')
    this._log('open SS connection with %s using token %s and secret %s', api, token, secret)

    return this._rx.Observable.create((observer) => {
      const source = new this._eventSource(`${api}/status?token=${token}&secret=${secret}&track=${track}`)
      source.addEventListener(SSETwitterDataSource.FAV_EVENT, (evt) => observer.onNext(JSON.parse(evt.data)))
      source.addEventListener(SSETwitterDataSource.ERR_EVENT, (evt) => observer.onError(evt))
      return () => source.close()
    })
  }

}

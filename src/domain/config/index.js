import development from './development'
import production from './production'

let base
if (process.env.NODE_ENV === 'development') { base = development }
if (process.env.NODE_ENV === 'production') { base = production }

class Config {
  constructor () {
    this._config = Object.assign({}, base)
  }

  get (key) {
    return this._config[key]
  }

  set (key, value) {
    this._config[key] = value
    return this
  }

}

const config = new Config()
export default config


class Config {
  constructor () {
    this._config = {}
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


import UserDataSource from './UserDataSource'

export default class EmptyUserDataSource extends UserDataSource {
  constructor ({log}) {
    super({log})
    this._log = log
  }

  saveCredentials ({token, secret} = {}) {
    this._log('saveCredentials')
  }
  removeCredentials () {
    this._log('removeCredentials')
  }

  credentials () {
    this._log('credentials')
  }
}

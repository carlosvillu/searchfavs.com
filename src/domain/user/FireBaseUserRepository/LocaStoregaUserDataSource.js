import UserDataSource from './UserDataSource'

export default class LocaStoregaUserDataSource extends UserDataSource {
  constructor ({storage, log}) {
    super({log})
    this._log = log
    this._storage = storage
  }

  saveCredentials ({accessToken: token, secret} = {}) {
    this._log('saveCredentials %j %j', token, secret)
    this._storage.token = token
    this._storage.secret = secret
    return Promise.resolve() // Fake async API
  }

  removeCredentials () {
    this._log('Removing credential from LS')
    this._storage.removeItem('secret')
    this._storage.removeItem('token')
    return Promise.resolve() // Fake async API
  }

  credentials () {
    const token = this._storage.token
    const secret = this._storage.secret
    this._log('Getting credentials from LS %j', {token, secret})
    return Promise.resolve({token, secret})
  }
}

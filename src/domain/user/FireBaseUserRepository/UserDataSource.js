import DataSource from '../../DataSource'

export default class UserDataSource extends DataSource {
  saveCredentials () {
    throw new Error('[UserDataSource#saveCredentials] must be implemented')
  }
  removeCredentials () {
    throw new Error('[UserDataSource#removeCredentials] must be implemented')
  }

  credentials () {
    throw new Error('[UserDataSource#credentials] must be implemented')
  }
}

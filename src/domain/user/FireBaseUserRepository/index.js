import UserRepository from '../UserRepository'
import UserFactory from '../../factories/user'

const fromUserFireBaseToEntity = ({user, token, secret} = {}) => {
  const {displayName: name, photoURL: avatar, uid: id} = user
  if (!id) { return false }
  return UserFactory.userEntity({name, avatar, id, token, secret})
}

export default class FireBaseUserRepository extends UserRepository {
  constructor ({config, log, dataSource}) {
    super({config, log, dataSource})
    this._config = config
    this._log = log
    this._dataSource = dataSource
  }

  async currentUser () {
    const firebase = this._config.get('firebase')
    const {credential, user} = await firebase
                                      .auth()
                                      .getRedirectResult()

    if (credential) {
      this._log('UserCredentials', credential)
      await this._dataSource.saveCredentials(credential)
    }

    const {token, secret} = await this._dataSource.credentials()
    const current = fromUserFireBaseToEntity({user: user || firebase.auth().currentUser, token, secret})
    this._log('UserCurrent', current)
    return current ? Promise.resolve(current)
                   : Promise.reject()

    // .catch(() => this._log('Any user logged'))
  }

  signinWithTwitter () {
    const firebase = this._config.get('firebase')
    const provider = new firebase.auth.TwitterAuthProvider()
    return firebase.auth().signInWithRedirect(provider)
  }

  async logoutUser () {
    await this._config.get('firebase')
                        .auth()
                        .signOut()
    await this._dataSource.removeCredentials()
    return Promise.resolve()
  }
}

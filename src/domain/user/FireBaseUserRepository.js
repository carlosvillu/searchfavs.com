import UserRepository from './UserRepository'
import UserFactory from '../factories/user'

const fromUserFireBaseToEntity = ({displayName: name, photoURL: avatar, uid: id} = {}) => {
  if (!id) { return false }
  return UserFactory.userEntity({name, avatar, id})
}

export default class FireBaseUserRepository extends UserRepository {
  constructor ({config, log}) {
    super({config, log})
    this._config = config
    this._log = log
  }

  currentUser () {
    const firebase = this._config.get('firebase')
    return firebase
      .auth()
      .getRedirectResult()
      .then(({credential, user}) => {
        const current = fromUserFireBaseToEntity(user || firebase.auth().currentUser)
        this._log('UserCurrent', current)
        return current ? Promise.resolve(current)
                       : Promise.reject()
      })
      .catch(() => this._log('Any user logged'))
  }

  signinWithTwitter () {
    const firebase = this._config.get('firebase')
    const provider = new firebase.auth.TwitterAuthProvider()
    return firebase.auth().signInWithRedirect(provider)
  }

  logoutUser () {
    return this._config.get('firebase')
                        .auth()
                        .signOut()
  }
}

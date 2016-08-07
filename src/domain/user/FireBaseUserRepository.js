import UserRepository from './UserRepository'
import UserFactory from '../factories/user'

const fromUserFireBaseToEntity = ({displayName: name, photoURL: avatar, uid: id} = {}) => {
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
    const user = firebase.auth().currentUser
    if (user) {
      this._log('There is a current user %o', user)
      return Promise.resolve(user)
    }

    return firebase
      .auth()
      .getRedirectResult()
      .then(({credential, user}) => {
        const current = user || firebase.auth().currentUser
        this._log('UserCurrent', current)
        return current ? Promise.resolve(fromUserFireBaseToEntity(current)) : Promise.reject()
      })
      .catch(console.error.bind(console))
  }

  signinWithTwitter () {
    const firebase = this._config.get('firebase')
    const provider = new firebase.auth.TwitterAuthProvider()
    return firebase.auth().signInWithRedirect(provider)
  }
}

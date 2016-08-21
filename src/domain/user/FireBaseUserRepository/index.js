import union from 'lodash.union'

import UserRepository from '../UserRepository'
import UserFactory from '../../factories/user'
import TwitterFactory from '../../factories/twitter'

const fromUserFireBaseToEntity = ({user, token, secret} = {}) => {
  const {displayName: name, photoURL: avatar, uid: id} = user
  if (!id) { return false }
  return UserFactory.userEntity({name, avatar, id, token, secret})
}

const fromTweetFireBaseToEntity = ({id, text, urls, media} = {}) => {
  return TwitterFactory.tweetEntity({id, text, urls, media})
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

  async saveTweets ({tweets, user} = {}) {
    this._log('Saving %j', tweets.length)
    const firebase = this._config.get('firebase')

    const saveTweets = tweets.map(tweet => firebase.database().ref(`tweets/${tweet.id}`).set(tweet.toJSON()))

    const userTweets = await this.tweets({user})
    const ids = union(
      (userTweets || []).map(twt => twt.id),
      tweets.map(twt => twt.id)
    )
    const addTweetsToUser = firebase.database().ref(`users/${user.id}/tweets`).set(ids)

    return Promise.all(
      saveTweets.concat(addTweetsToUser)
    )
  }

  async tweets ({user} = {}) {
    const firebase = this._config.get('firebase')

    this._log('Get tweet for the user')
    const userTweetsSnapshot = await firebase.database().ref(`users/${user.id}/tweets`).once('value')
    const ids = userTweetsSnapshot.val() || []
    return await Promise.all(
      ids.map(
        id => firebase.database().ref(`tweets/${id}`).once('value').then(snapshot => snapshot.val())
      )
    ).then(tweets => tweets.map(fromTweetFireBaseToEntity))
  }
}

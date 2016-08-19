import union from 'lodash.union'
import TwitterRepository from './TwitterRepository'

export default class FireBaseTwitterRepository extends TwitterRepository {
  constructor ({log, config} = {}) {
    super({log, config})

    this._log = log
    this._config = config
  }

  save ({tweets, user} = {}) {
    this._log('Saving %j', tweets.length)
    const firebase = this._config.get('firebase')
    const saveTweets = tweets.map(tweet => firebase.database().ref(`tweets/${tweet.id}`).set(tweet.toJSON()))
    const addTweetsToUser = this._addTweetsToUser({tweets, user})
    return Promise.all(
      saveTweets.concat(addTweetsToUser)
    )
  }

  _addTweetsToUser ({tweets, user}) {
    const firebase = this._config.get('firebase')
    const tweetsIds = tweets.map(twt => twt.id)

    return new Promise(resolve => {
      const userTweetsReference = firebase.database().ref(`users/${user.id}/tweets`)
      userTweetsReference.on('value', (snapshot) => {
        const ids = union(snapshot.val() || [], tweetsIds)
        userTweetsReference.set(ids).then(resolve)
      })
    })
  }
}

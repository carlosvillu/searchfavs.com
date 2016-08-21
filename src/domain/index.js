import config from './config'

import UserFactory from './factories/user'
import TwitterFactory from './factories/twitter'
import SearchFactory from './factories/search'

class SearchFavs {
  constructor () {
    this._config = config
    this._map = {}

    this._map['current_user_use_case'] = UserFactory.currentUserUseCase()
    this._map['signin_with_twitter_user_use_case'] = UserFactory.signinWithTwitterUserUseCase()
    this._map['logout_current_user_use_case'] = UserFactory.logoutCurrentUserUseCase()

    this._map['favorites_tweets_twitter_use_case'] = TwitterFactory.favoritesTweetsTwitterUseCase()
    this._map['save_tweets_user_use_case'] = UserFactory.saveTweetsUserUseCase()
    this._map['tweets_user_use_case'] = UserFactory.tweetsUserUseCase()

    this._map['index_tweets_search_use_case'] = SearchFactory.indexTweetsSearchUseCase()
  }

  get (key) {
    return this._map[key] ? this._map[key]
                          : {execute: () => Promise.reject(`[SearchFavs#get] ${key} not defined`)}
  }

  config (key, value) {
    this._config.set(key, value)
    return this
  }
}

const searchFavs = new SearchFavs()
export default searchFavs

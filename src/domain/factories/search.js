import config from '../config'
import factoryLogger from '../logger'

import IndexTweetsSearchUseCase from '../search/IndexTweetsSearchUseCase'
import SearchTweetsSearchUseCase from '../search/SearchTweetsSearchUseCase'

import AlgoliaSearchRepository from '../search/AlgoliaSearchRepository'

import UserToIndexMapper from '../search/UserToIndexMapper'

export default class SearchFactory {

  static indexTweetsSearchUseCase () {
    return new IndexTweetsSearchUseCase({
      repository: SearchFactory.algoliaSearchRepository(),
      mapper: SearchFactory.userToIndexMapper(),
      log: factoryLogger({prefix: 'IndexTweetsSearchUseCase'})
    })
  }

  static searchTweetsSearchUseCase () {
    return new SearchTweetsSearchUseCase({
      repository: SearchFactory.algoliaSearchRepository(),
      mapper: SearchFactory.userToIndexMapper(),
      log: factoryLogger({prefix: 'SearchTweetsSearchUseCase'})
    })
  }

  static algoliaSearchRepository () {
    return new AlgoliaSearchRepository({
      config,
      log: factoryLogger({prefix: 'AlgoliaSearchRepository'})
    })
  }

  static userToIndexMapper () {
    return new UserToIndexMapper()
  }
}

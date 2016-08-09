import rx from 'rx-lite'

import config from '../config'
import factoryLogger from '../logger'

import FavoritesTwitterUseCase from '../twitter/FavoritesTwitterUseCase'

import HTTPTwitterRepository from '../twitter/HTTPTwitterRepository'

import SSETwitterDataSource from '../twitter/HTTPTwitterRepository/SSETwitterDataSource'

export default class TwitterFactory {

  static favoritesTwitterUseCase () {
    return new FavoritesTwitterUseCase({
      repository: TwitterFactory.hTTPTwitterRepository(),
      log: factoryLogger({prefix: 'FavoritesTwitterUseCase'})
    })
  }

  static hTTPTwitterRepository () {
    return new HTTPTwitterRepository({
      dataSource: TwitterFactory.sSETwitterDataSource(),
      log: factoryLogger({prefix: 'HTTPTwitterRepository'})
    })
  }

  static sSETwitterDataSource () {
    return new SSETwitterDataSource({
      config,
      rx,
      eventSource: window.EventSource,
      log: factoryLogger({prefix: 'SSETwitterDataSource'})
    })
  }

}

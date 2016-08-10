import rx from 'rx-lite'

import config from '../config'
import factoryLogger from '../logger'

import FavoritesTwitterUseCase from '../twitter/FavoritesTwitterUseCase'

import HTTPTwitterRepository from '../twitter/HTTPTwitterRepository'

import SSETwitterDataSource from '../twitter/HTTPTwitterRepository/SSETwitterDataSource'
import FetchTwitterDataSource from '../twitter/HTTPTwitterRepository/FetchTwitterDataSource'

export default class TwitterFactory {

  static favoritesTwitterUseCase () {
    return new FavoritesTwitterUseCase({
      repository: TwitterFactory.hTTPTwitterRepository({dataSource: 'fetchTwitterDataSource'}),
      log: factoryLogger({prefix: 'FavoritesTwitterUseCase'})
    })
  }

  // Lo dejo aquí para acordarme cuando lo implemente
  // static statusesTwitterUseCase () {
  //   return new StatusesTwitterUseCase({
  //     repository: TwitterFactory.hTTPTwitterRepository({dataSource: 'sSETwitterDataSource'}),
  //     log: factoryLogger({prefix: 'StatusesTwitterUseCase'})
  //   })
  // }

  static hTTPTwitterRepository ({dataSource}) {
    return new HTTPTwitterRepository({
      dataSource: TwitterFactory[dataSource](),
      log: factoryLogger({prefix: 'HTTPTwitterRepository'})
    })
  }

  static fetchTwitterDataSource () {
    return new FetchTwitterDataSource({
      config,
      log: factoryLogger({prefix: 'FetchTwitterDataSource'})
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

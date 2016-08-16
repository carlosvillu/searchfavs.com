import rx from 'rx-lite'

import config from '../config'
import factoryLogger from '../logger'

import TweetEntity from '../twitter/TweetEntity'

import FavoritesTwitterUseCase from '../twitter/FavoritesTwitterUseCase'
import SaveTweetsUseCase from '../twitter/SaveTweetsUseCase'

import HTTPTwitterRepository from '../twitter/HTTPTwitterRepository'
import FireBaseTwitterRepository from '../twitter/FireBaseTwitterRepository'

import SSETwitterDataSource from '../twitter/HTTPTwitterRepository/SSETwitterDataSource'
import FetchTwitterDataSource from '../twitter/HTTPTwitterRepository/FetchTwitterDataSource'

export default class TwitterFactory {

  static tweetEntity ({id, text, urls, media}) {
    return new TweetEntity({id, text, urls, media})
  }

  static favoritesTwitterUseCase () {
    return new FavoritesTwitterUseCase({
      repository: TwitterFactory.hTTPTwitterRepository({dataSource: 'fetchTwitterDataSource'}),
      log: factoryLogger({prefix: 'FavoritesTwitterUseCase'})
    })
  }

  static saveTweetsUseCase () {
    return new SaveTweetsUseCase({
      repository: TwitterFactory.fireBaseTwitterRepository()
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

  static fireBaseTwitterRepository () {
    return new FireBaseTwitterRepository({
      config,
      log: factoryLogger({prefix: 'FireBaseTwitterRepository'})
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

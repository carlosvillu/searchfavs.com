import SearchRepository from './SearchRepository'
import TwitterFactory from '../factories/twitter'

import cache from '@schibstedspain/cv-decorators/lib/decorators/cache'

const fromEntityToAlgoObject = ({tweet} = {}) => {
  return {
    ...tweet.toJSON(),
    objectID: tweet.id
  }
}

const fromAlgoObjectToEntity = ({id, text, urls, media} = {}) => {
  return TwitterFactory.tweetEntity({id, text, urls, media})
}

export default class AlgoliaSearchRepository extends SearchRepository {
  constructor ({config, log} = {}) {
    super({config})

    this._config = config
    this._log = log
  }

  indexing ({index, tweets} = {}) {
    const algo = this._config.get('algo').initIndex(index)
    return Promise.all(
      tweets
        .map(tweet => fromEntityToAlgoObject({tweet}))
        .map(obj => new Promise((resolve, reject) => {
          algo.addObject(obj, (err, content) => {
            if (err) { reject(err) }
            resolve(content)
          })
        }))
    )
  }

  @cache({ttl: '2 minutes'})
  search ({query, index} = {}) {
    this._log('Searching %s in index %s', query, index)
    const algo = this._config.get('algo').initIndex(index)

    return new Promise((resolve, reject) => {
      algo.search(query, (err, content) => {
        if (err) { reject(err) }
        resolve(content.hits.map(fromAlgoObjectToEntity))
      })
    })
  }
}


import SearchRepository from './SearchRepository'

const fromEntityToAlgoObject = ({tweet} = {}) => {
  return {
    ...tweet.toJSON(),
    objectID: tweet.id
  }
}

export default class AlgoliaSearchRepository extends SearchRepository {
  constructor ({config, log} = {}) {
    super({config})

    this._config = config
    this._log = log
  }
  indexing ({index, tweets}) {
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
}


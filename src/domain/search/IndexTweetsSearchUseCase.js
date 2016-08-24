import UseCase from '../UseCase'

export default class IndexTweetsSearchUseCase extends UseCase {
  constructor ({repository, mapper, log} = {}) {
    super({repository})

    this._mapper = mapper
    this._log = log
    this._repository = repository
  }

  execute ({user, tweets} = {}) {
    const index = this._mapper.from({user}).index()
    this._log('Indexing %d tweets in index %s', tweets.length, index)
    return this._repository.indexing({index, tweets})
  }
}

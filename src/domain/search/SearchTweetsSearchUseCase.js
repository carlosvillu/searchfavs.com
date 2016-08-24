import UseCase from '../UseCase'

import streamify from '@schibstedspain/cv-decorators/lib/decorators/streamify'

@streamify('execute')
export default class SearchTweetsSearchUseCase extends UseCase {
  constructor ({repository, mapper, log} = {}) {
    super({repository, mapper, log})

    this._repository = repository
    this._mapper = mapper
    this._log = log
  }

  async execute ({query, user} = {}) {
    const index = this._mapper.from({user}).index()
    const tweets = await this._repository.search({query, index})
    return tweets
  }
}

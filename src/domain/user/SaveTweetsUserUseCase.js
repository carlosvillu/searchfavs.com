import UseCase from '../UseCase'

export default class SaveTweetsUserUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})

    this._repository = repository
  }

  execute ({tweets, user} = {}) {
    return this._repository.saveTweets({tweets, user})
  }
}


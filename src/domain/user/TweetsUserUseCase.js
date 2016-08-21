import UseCase from '../UseCase'

export default class TweetsUserUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})

    this._repository = repository
  }

  execute ({user} = {}) {
    return this._repository.tweets({user})
  }
}

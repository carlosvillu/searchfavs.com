import UseCase from '../UseCase'

export default class FavoritesTwitterUseCase extends UseCase {
  constructor ({repository} = {}) {
    super({repository})

    this._repository = repository
  }

  execute ({tweets, user} = {}) {
    return this._repository.save({tweets, user})
  }
}

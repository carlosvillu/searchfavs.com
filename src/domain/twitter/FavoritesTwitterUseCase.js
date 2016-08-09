import UseCase from '../UseCase'

export default class FavoritesTwitterUseCase extends UseCase {

  constructor ({repository, log}) {
    super({repository, log})

    this._repository = repository
    this._log = log
  }

  /**
   * @param user [UserEntity]
   * @return Stream
  * */
  execute ({user}) {
    const {token, secret} = user
    this._log('Getting favorites for %j', user)
    return this._repository.favorites({token, secret})
  }
}

import UseCase from '../UseCase'

export default class SigninWithTwitterUserUseCase extends UseCase {
  constructor ({repository, log}) {
    super({repository, log})

    this._repository = repository
    this._log = log
  }

  execute () {
    return this._repository.signinWithTwitter()
  }
}

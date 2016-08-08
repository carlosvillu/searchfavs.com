import UseCase from '../UseCase'

export default class LogoutCurrentUserUseCase extends UseCase {
  constructor ({repository, log} = {}) {
    super({repository, log})

    this._log = log
    this._repository = repository
  }

  execute () {
    return this._repository.logoutUser()
  }

}

import UseCase from '../UseCase'

import cache from '@schibstedspain/cv-decorators/lib/decorators/cache'

/**
 * Return the current signin user. If not there is a currente user reject the promise
* */
export default class CurrentUserUseCase extends UseCase {
  constructor ({repository, log}) {
    super({repository})

    this._repository = repository
    this._log = log
  }

  @cache({ttl: '10 seconds'})
  async execute () {
    this._log('Chenking for current user')
    const user = await this._repository.currentUser()
    return user || Promise.reject()
  }
}

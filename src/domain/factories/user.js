import config from '../config'
import factoryLogger from '../logger'

import UserEntity from '../user/UserEntity'

import CurrentUserUseCase from '../user/CurrentUserUseCase'
import SigninWithTwitterUserUseCase from '../user/SigninWithTwitterUserUseCase'
import LogoutCurrentUserUseCase from '../user/LogoutCurrentUserUseCase'
import SaveTweetsUserUseCase from '../user/SaveTweetsUserUseCase'
import TweetsUserUseCase from '../user/TweetsUserUseCase'

import FireBaseUserRepository from '../user/FireBaseUserRepository'

import LocaStoregaUserDataSource from '../user/FireBaseUserRepository/LocaStoregaUserDataSource'
import EmptyUserDataSource from '../user/FireBaseUserRepository/EmptyUserDataSource'

export default class UserFactory {

  static userEntity ({name, avatar, id, token, secret} = {}) {
    return new UserEntity({name, avatar, id, token, secret})
  }

  static currentUserUseCase () {
    return new CurrentUserUseCase({
      repository: UserFactory.firebaseRepository(),
      log: factoryLogger({prefix: 'CurrentUserUseCase'})
    })
  }

  static signinWithTwitterUserUseCase () {
    return new SigninWithTwitterUserUseCase({
      repository: UserFactory.firebaseRepository(),
      log: factoryLogger({prefix: 'SigninWithTwitterUserUseCase'})
    })
  }

  static logoutCurrentUserUseCase () {
    return new LogoutCurrentUserUseCase({
      repository: UserFactory.firebaseRepository(),
      log: factoryLogger({prefix: 'LogoutCurrentUserUseCase'})
    })
  }

  static saveTweetsUserUseCase () {
    return new SaveTweetsUserUseCase({
      repository: UserFactory.firebaseRepository(),
      log: factoryLogger({prefix: 'SaveTweetsUserUseCase'})
    })
  }

  static tweetsUserUseCase () {
    return new TweetsUserUseCase({
      repository: UserFactory.firebaseRepository(),
      log: factoryLogger({prefix: 'TweetsUserUseCase'})
    })
  }

  static firebaseRepository () {
    return new FireBaseUserRepository({
      log: factoryLogger({prefix: 'FireBaseUserRepository'}),
      dataSource: typeof localStorage === 'object' ? UserFactory.locaStoregaUserDataSource()
                                                   : UserFactory.emptyUserDataSource(),
      config
    })
  }

  static locaStoregaUserDataSource () {
    return new LocaStoregaUserDataSource({
      storage: window.localStorage,
      log: factoryLogger({prefix: 'LocaStoregaUserDataSource'})
    })
  }

  static emptyUserDataSource () {
    return new EmptyUserDataSource({
      log: factoryLogger({prefix: 'EmptyUserDataSource'})
    })
  }

}

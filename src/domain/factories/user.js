import config from '../config'
import factoryLogger from '../logger'

import UserEntity from '../user/UserEntity'

import CurrentUserUseCase from '../user/CurrentUserUseCase'
import SigninWithTwitterUserUseCase from '../user/SigninWithTwitterUserUseCase'
import LogoutCurrentUserUseCase from '../user/LogoutCurrentUserUseCase'

import FireBaseUserRepository from '../user/FireBaseUserRepository'

export default class UserFactory {

  static userEntity ({name, avatar, uid: id} = {}) {
    return new UserEntity({name, avatar, uid: id})
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

  static firebaseRepository () {
    return new FireBaseUserRepository({
      log: factoryLogger({prefix: 'FireBaseUserRepository'}),
      config
    })
  }

}

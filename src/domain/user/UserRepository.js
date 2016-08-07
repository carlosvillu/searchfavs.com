import Repository from '../Repository'

export default class UserRepository extends Repository {
  currentUser () {
    throw new Error('[UserRepository#currentUser] must be implemented')
  }

  signinWithTwitter () {
    throw new Error('[UserRepository#signinWithTwitter] must be implemented')
  }
}

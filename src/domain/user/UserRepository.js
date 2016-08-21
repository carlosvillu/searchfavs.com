import Repository from '../Repository'

export default class UserRepository extends Repository {
  currentUser () {
    throw new Error('[UserRepository#currentUser] must be implemented')
  }

  signinWithTwitter () {
    throw new Error('[UserRepository#signinWithTwitter] must be implemented')
  }

  logoutUser () {
    throw new Error('[UserRepository#logoutUser] must be implemented')
  }

  saveTweets () {
    throw new Error('[UserRepository#saveTweets] must be implemented')
  }

  tweets () {
    throw new Error('[UserRepository#tweets] must be implemented')
  }
}

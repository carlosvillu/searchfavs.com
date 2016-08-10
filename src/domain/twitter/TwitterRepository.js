import Repository from '../Repository'

export default class TwitterRepository extends Repository {

  token () {
    throw new Error('[TwitterRepository#token] must be implemented')
  }

  secret () {
    throw new Error('[TwitterRepository#secret] must be implemented')
  }

  statuses () {
    throw new Error('[TwitterRepository#statuses] must be implemented')
  }

  favorites () {
    throw new Error('[TwitterRepository#favorites] must be implemented')
  }
}

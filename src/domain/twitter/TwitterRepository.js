import Repository from '../Repository'

export default class TwitterRepository extends Repository {
  favorites () {
    throw new Error('[TwitterRepository#favorites] must be implemented')
  }
}

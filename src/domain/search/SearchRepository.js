import Repository from '../Repository'

export default class SearchRepository extends Repository {
  indexing () {
    throw new Error('[SearchRepository#indexing] must be implemented')
  }
}

import Repository from '../Repository'

export default class SearchRepository extends Repository {
  indexing () {
    throw new Error('[SearchRepository#indexing] must be implemented')
  }

  search () {
    throw new Error('[SearchRepository#search] must be implemented')
  }
}

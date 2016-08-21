export default class UserToIndexMapper {
  from ({user} = {}) {
    this._user = user
    return this
  }
  index () {
    return `${this._user.id}#tweets`
  }
}

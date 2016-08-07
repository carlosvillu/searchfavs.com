import Entity from '../Entity'

export default class UserEntity extends Entity {
  constructor ({name, avatar, id} = {}) {
    super({name, avatar, id})

    this.name = name
    this.avatar = avatar
    this.id = id
  }
}

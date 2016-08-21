import Entity from '../Entity'

export default class TweetEntity extends Entity {
  constructor ({id, text, urls = [], media = []} = {}) {
    super({id, text, urls, media})

    this.id = id
    this.text = text
    this._urls = urls
    this._media = media
  }

  toJSON () {
    return {
      id: this.id,
      text: this.text,
      urls: this._urls,
      media: this._media
    }
  }
}

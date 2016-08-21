import React from 'react'
import uniqby from 'lodash.uniqby'
import xorby from 'lodash.xorby'

class ListFavs extends React.Component {
  constructor (props, ctxt) {
    super(props, ctxt)

    this.domain = ctxt.domain
    this._log = ctxt.factoryLogger({prefix: 'ListFavs'})
    this.state = {favs: []}
  }

  async componentDidMount () {
    const user = await this.domain.get('current_user_use_case').execute()

    // Favs from User
    const favoritesUser = await this.domain.get('tweets_user_use_case').execute({user})
    this.setState({
      favs: [].concat(this.state.favs).concat(favoritesUser || []).sort((a, b) => b.id - a.id)
    }, async () => {
      // Favs from Tweeter
      const favoritesTweeter = await this.domain.get('favorites_tweets_twitter_use_case').execute({user})
      if (favoritesTweeter) {
        this.domain.get('save_tweets_user_use_case').execute({tweets: favoritesTweeter, user})
        this.domain.get('index_tweets_search_use_case').execute({
          user,
          tweets: xorby(this.state.favs, favoritesTweeter || [], 'id')
        })
        this.setState({
          favs: uniqby(this.state.favs.concat(favoritesTweeter || []), 'id').sort((a, b) => b.id - a.id)
        })
        // this._log('favoritesTweeter %j', favoritesTweeter)
      }
    })
    // this._log('favoritesUser %j', favoritesUser)
  }

  render () {
    const {favs} = this.state
    return (
      <ul className='ListFavs'>
        {
          favs.length !== 0 ? favs.map((fav, index) => <li className='Fav' key={index}>{fav.text}</li>)
                            : <li className='Fav'>Obteniendo Favs</li>
        }
      </ul>
    )
  }
}

ListFavs.displayName = 'ListFavs'
ListFavs.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}

export default ListFavs

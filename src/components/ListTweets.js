import React from 'react'
import uniqby from 'lodash.uniqby'
import xorby from 'lodash.xorby'

class ListTweets extends React.Component {
  static get EMPTY_QUERY () { return '' }
  static get EMPTY_LIST () { return [] }
  static get EMPTY_LIST_LENGTH () { return 0 }

  constructor (props, ctxt) {
    super(props, ctxt)

    this.domain = ctxt.domain
    this._log = ctxt.factoryLogger({prefix: 'ListTweets'})
    this.state = {user: [], search: []}
  }

  async componentDidMount () {
    const user = await this.domain.get('current_user_use_case').execute()
    this.search$ = this.domain.get('search_tweets_search_use_case').$.execute.subscribe(({result, params}) => {
      const [{query}] = params
      this.setState({ search: query !== ListTweets.EMPTY_QUERY ? result : ListTweets.EMPTY_LIST })
    })

    // Favs from User
    const favoritesUser = await this.domain.get('tweets_user_use_case').execute({user})
    this.setState({
      user: [].concat(this.state.user).concat(favoritesUser || ListTweets.EMPTY_LIST).sort((a, b) => b.id - a.id)
    }, async () => {
      // Favs from Tweeter
      const favoritesTweeter = await this.domain.get('favorites_tweets_twitter_use_case').execute({user})
      if (favoritesTweeter) {
        this.domain.get('save_tweets_user_use_case').execute({tweets: favoritesTweeter, user})
        this.domain.get('index_tweets_search_use_case').execute({
          user,
          tweets: xorby(this.state.user, favoritesTweeter || ListTweets.EMPTY_LIST, 'id')
        })
        this.setState({
          user: uniqby(this.state.user.concat(favoritesTweeter || ListTweets.EMPTY_LIST), 'id').sort((a, b) => b.id - a.id)
        })
        // this._log('favoritesTweeter %j', favoritesTweeter)
      }
    })
    // this._log('favoritesUser %j', favoritesUser)
  }

  componentWillUnmount () {
    this.search$.dispose()
  }

  render () {
    const {user, search} = this.state

    console.log(user.length !== ListTweets.EMPTY_LIST_LENGTH, ListTweets.EMPTY_LIST_LENGTH)
    console.log(search.length !== ListTweets.EMPTY_LIST_LENGTH)

    return (
      <ul className='ListTweets'>
        {
          search.length !== ListTweets.EMPTY_LIST_LENGTH
            ? search.map((fav, index) => <li className='Fav' key={fav.id}>{fav.text}</li>)
            : user.length !== ListTweets.EMPTY_LIST_LENGTH
              ? user.map((fav, index) => <li className='Fav' key={fav.id}>{fav.text}</li>)
              : <li className='Fav'>Obteniendo Favs</li>
        }
      </ul>
    )
  }
}

ListTweets.displayName = 'ListTweets'
ListTweets.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}

export default ListTweets

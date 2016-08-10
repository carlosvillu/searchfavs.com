import React from 'react'

class ListFavs extends React.Component {
  constructor (props, ctxt) {
    super(props, ctxt)

    this.domain = ctxt.domain
    this._log = ctxt.factoryLogger({prefix: 'ListFavs'})
    this.state = {favs: []}
  }

  async componentDidMount () {
    const user = await this.domain.get('current_user_use_case').execute()
    const favorites = await this.domain.get('favorites_twitter_use_case').execute({user})
    this.setState({ favs: [].concat(this.state.favs).concat(favorites) })
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

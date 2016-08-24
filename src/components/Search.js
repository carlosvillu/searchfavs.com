import React from 'react'

const doSearch = async (domain, evt) => {
  const query = evt.target.value
  const user = await domain.get('current_user_use_case').execute()
  domain.get('search_tweets_search_use_case').execute({query, user})
}

const Search = (props, {domain, factoryLogger}) => {
  return (
    <div className='Search'>
      <input
        type='text'
        onChange={doSearch.bind(null, domain)}
        placeholder='Search by favs' />
    </div>
  )
}

Search.displayName = 'Search'
Search.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}

export default Search

import React from 'react'
import Link from 'react-router/lib/Link'

import ListTweets from '../components/ListTweets'
import Search from '../components/Search'

const Home = () => {
  return (
    <div className='Home'>
      Bienvenido a la web <Link to='/logout'>Logout</Link>
      <Search />
      <ListTweets />
    </div>
  )
}

Home.displayName = 'Home'

export default Home


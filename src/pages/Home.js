import React from 'react'
import Link from 'react-router/lib/Link'
import ListFavs from '../components/ListFavs'

const Home = () => {
  return (
    <div className='Home'>
      Bienvenido a la web <Link to='/logout'>Logout</Link>
      <ListFavs />
    </div>
  )
}

Home.displayName = 'Home'

export default Home


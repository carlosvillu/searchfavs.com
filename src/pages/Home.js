import React from 'react'
import Link from 'react-router/lib/Link'

const Home = (_, {domain, factoryLogger}) => {
  return (
    <div className='Home'>
      Bienvenido a la web <Link to='/logout'>Logout</Link>
    </div>
  )
}

Home.displayName = 'Home'
Home.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}
export default Home


import React from 'react'
import Link from 'react-router/lib/Link'

import ListTweets from '../../components/ListTweets'
import Search from '../../components/Search'
import './Home.scss'

const Home = () => {
  return (
    <div className='Home'>
      <div className='header' id='navbar'>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container '>
            <div className='col-xs-12 col-md-8 col-md-offset-2 navbar-container'>
              <div className='navbar-logo hidden-xs hidden-sm'>
                <a className='navbar-brand' href='#'>searchfavs</a>
              </div>
              <div className='navbar-search'>
                <Search />
              </div>
              <div className='navbar-user'>
                <button type='button' className='btn btn-default ' data-toggle='dropdown' data-target='#header-menu' aria-expanded='false'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='glyphicon glyphicon-user' />{'\u00A0'}
                </button>
                <ul className='dropdown-menu' id='header-menu'>
                  <li role='presentation'><Link to='/logout'>Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className='body-tweets'>
        <div className='container'>
          <ListTweets />
        </div>
      </div>
    </div>
  )
}

Home.displayName = 'Home'

export default Home


import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'

import SearchFavs from './domain'

const logout = (nextState, replace, cb) => {
  SearchFavs.get('logout_current_user_use_case')
    .execute()
    .then(() => document.location.href = '/') // eslint-disable-line
}

const requireAuth = (nextState, replace, cb) => {
  SearchFavs.get('current_user_use_case')
    .execute()
    .then(user => cb())
    .catch(() => {
      replace('/signin')
      cb()
    })
}

const redirectToHome = (nextState, replace, cb) => {
  SearchFavs.get('current_user_use_case')
    .execute()
    .then(user => {
      replace('/')
      cb()
    }).catch(() => cb())
}

const loadLayoutPage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/Layout').default), 'Layout')

const loadHomePage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/Home').default), 'Home')

const loadSigninPage =
  (location, callback) =>
    require.ensure([], (require) => callback(null, require('./pages/Signin').default), 'Signin')

export default (
  <Route>
    <Route getComponent={loadLayoutPage} >
      <Route path='/signin' getComponent={loadSigninPage} onEnter={redirectToHome} />
      <Route path='/logout' onEnter={logout} />
      <Route path='/' onEnter={requireAuth}>
        <IndexRoute getComponent={loadHomePage} />
      </Route>
    </Route>
  </Route>
)

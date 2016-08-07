import React from 'react'
import reactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './routes'

import Provider from './components/Provider'
import SearchFavs from './domain'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCTKNu9TZnvfNtNCQJxc7qq94P7hOrIFJc',
  authDomain: 'searchfavs.firebaseapp.com',
  databaseURL: 'https://searchfavs.firebaseio.com',
  storageBucket: 'searchfavs.appspot.com'
}
window.firebase.initializeApp(config)
const domain = SearchFavs.config('firebase', window.firebase)

reactDOM.render(
  <Provider domain={domain}>
    <Router routes={routes} history={browserHistory} />
  </ Provider>
  , document.getElementById('root')
)

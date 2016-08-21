import React from 'react'
import reactDOM from 'react-dom'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import routes from './routes'
import algoliasearch from 'algoliasearch'

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
algoliasearch('applicationID', 'apiKey')
const domain = SearchFavs
  .config('firebase', window.firebase)
  // Con dos huevos si señor!!!
  // maybe some day https://github.com/prose/gatekeeper
  .config('algo', algoliasearch('LYABFILJKQ', '17b2fb157d1eccb2f5766213f6998cb9', {protocol: 'https:'}))

reactDOM.render(
  <Provider domain={domain}>
    <Router routes={routes} history={browserHistory} />
  </ Provider>
  , document.getElementById('root')
)

import React from 'react'

const Signin = (_, {domain, factoryLogger}) => {
  const _log = factoryLogger({prefix: 'Signin'})
  const loginUser = () => {
    _log('Trying to Signup user')
    domain.get('signin_with_twitter_user_use_case').execute()
  }
  return (
    <div className='Signin'>
      <img onClick={loginUser} src={require('./sign-in-with-twitter-gray.png')} />
    </div>
  )
}

Signin.displayName = 'Signin'
Signin.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}
export default Signin

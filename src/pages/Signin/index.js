import React from 'react'

const Signin = (_, {domain, factoryLogger}) => {
  const _log = factoryLogger({prefix: 'Signin'})
  const loginUser = () => {
    _log('Trying to Signup user')
    domain.get('signin_with_twitter_user_use_case').execute()
  }
  return (
    <div className='containerer'>
      <div className='jumbotron text-center'>
        <h1>searchfavs.com</h1>
        <p>Encontrá tus favoritos</p>
        <button className='Signin btn btn-primary btn-lg' type='button' aria-label='Left Align'>
          <span onClick={loginUser} >
            <i className='fa fa-twitter' aria-hidden='true'></i>
            &nbsp; Ingresar
          </span>
        </button>
      </div>
    </div>
  )
}

Signin.displayName = 'Signin'
Signin.contextTypes = {
  domain: React.PropTypes.object,
  factoryLogger: React.PropTypes.func
}
export default Signin

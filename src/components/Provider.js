import { Component, PropTypes, Children } from 'react'
import debug from 'debug'

export default class Provider extends Component {
  getChildContext () {
    return {domain: this.domain, factoryLogger: this.factoryLogger}
  }

  constructor (props, context) {
    super(props, context)
    this.domain = props.domain
    this.factoryLogger = ({prefix} = {}) => debug(`sfr:${prefix}`)
  }

  render () {
    return Children.only(this.props.children)
  }
}

if (process.env.NODE_ENV !== 'production') {
  Provider.prototype.componentWillReceiveProps = function (nextProps) {
    const { domain } = this
    const { domain: nextDomain } = nextProps

    if (domain !== nextDomain) {
      console.warn('<Provider> does not support changing `domain` on the fly.')
    }
  }
}

Provider.displayName = 'Provider'
Provider.propTypes = {
  domain: PropTypes.object.isRequired,
  factoryLogger: PropTypes.func,
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  domain: PropTypes.object,
  factoryLogger: PropTypes.func
}


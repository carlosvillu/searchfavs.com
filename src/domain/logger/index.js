import debug from 'debug'

const factoryLogger = ({prefix} = {}) => debug(`sf:${prefix}`)

export default factoryLogger


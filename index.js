const winstonLogger = require('./lib/logger')
const morgan = require('./lib/morgan')
const appRootPath = require('app-root-path')
const APP_ROOT = require('app-root-path')
const yaml = require('js-yaml')
const fs = require('fs')
const TIMESTAMP = `${(new Date()).getFullYear()}-${('0' + ((new Date()).getMonth() + 1)).slice(-2)}-${('0' + (new Date()).getDate()).slice(-2)}`

const loggerConfig = getLoggerConfig()

module.exports = winstonLogger
module.exports.access = access
module.exports.morganDev = morgan('dev')

/**
 * 获取logger配置
 *
 */
function getLoggerConfig () {
    let config = {}

    try {
        config = yaml.safeLoad(fs.readFileSync(`${APP_ROOT}/logger.yml`, 'utf8'))
    } catch (e) {
        console.debug(e)
        console.warn('[WARN] "logger.yml" missing for logger! Using app name configured in package.json: ' + config.appName)

        return {
            appName: require(`${APP_ROOT}/package.json`).name
        }
    }
}

/**
 * 创建一个express插件，记录access log
 *
 */
function access (config = loggerConfig) {
    const { appName } = config
    const defaultLoggerDir = `${appRootPath}/logs/${appName}-access-${TIMESTAMP}`

    return morgan('access', {
        stream: fs.createWriteStream(`${defaultLoggerDir}.log`, { flags: 'a' }),
        skip: (req) => { return req.method === 'HEAD' }
    })
}

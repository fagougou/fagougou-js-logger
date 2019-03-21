/* DEFAULT LOG LEVELS */
/**
 *    {
 *      error: 0,
 *      warn: 1,
 *      info: 2,
 *      verbose: 3,
 *      debug: 4,
 *      silly: 5
 *    }
 */

const winston = require('winston')
const yaml = require('js-yaml')
const fs = require('fs')

/**
 * CONSTANTS
 */

const APP_ROOT = require('app-root-path')
const LOG_PATH = `${APP_ROOT}/logs`
// const COMBINED_LOG_PATH = `${LOG_PATH}/combined`
// const ERROR_LOG_PATH = `${LOG_PATH}/error`
// const EXCEPTION_LOG_PATH = `${LOG_PATH}/exception`

let config = {}

try {
    config = yaml.safeLoad(fs.readFileSync(`${APP_ROOT}/logger.yml`, 'utf8'))
} catch (e) {
    config = {
        appName: require(`${APP_ROOT}/package.json`).name
    }
    console.warn('[WARN] "logger.yml" missing for logger! Using app name configured in package.json: ' + config.appName)
}

const { appName } = config

if (!fs.existsSync(LOG_PATH)) {
    // Create log directories if does not exist
    fs.mkdirSync(LOG_PATH)
    // const paths = [ COMBINED_LOG_PATH, ERROR_LOG_PATH, EXCEPTION_LOG_PATH ]

    // paths.forEach(element => {
    //     fs.mkdirSync(element)
    // })
}

/**
 * @private
 */

const options = {
    combined: {
        level: 'info',
        filename: `${LOG_PATH}/${appName}.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    },
    debug: {
        level: 'debug',
        colorize: true,
        format: winston.format.simple()
    }
    // error: {
    //     level: 'error',
    //     filename: `${ERROR_LOG_PATH}/${appName}.log`,
    //     maxsize: 5242880, // 5MB
    //     maxFiles: 5,
    //     colorize: false
    // },
    // exception: {
    //     level: 'error',
    //     filename: `${EXCEPTION_LOG_PATH}/${appName}.log`,
    //     handleExceptions: true,
    //     maxsize: 5242880, // 5MB
    //     maxFiles: 5,
    //     colorize: false
    // }
}

const jsonFormatter = winston.format((info) => {
    const MESSAGE = Symbol.for('message')
    const base = { app: appName }
    const json = Object.assign(base, info)

    info[MESSAGE] = JSON.stringify(json)
    info = Object.assign(info, json)

    return info
})

/**
 * @public
 */

const logger = winston.createLogger({
    format: winston.format.combine(
        jsonFormatter(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File(options.combined)
        // new winston.transports.File(options.error),
        // new winston.transports.File(options.exception)
    ]
    // exceptionHandlers: [
    //     new winston.transports.File({ filename: `${LOG_DIR}/${appName}-exceptions.log` })
    // ],
    // exitOnError: true // do not exit on handled exceptions
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV_BETA === 'beta') {
    logger.add(new winston.transports.Console(options.debug))
}

module.exports = logger

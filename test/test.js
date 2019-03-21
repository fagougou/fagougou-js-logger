const logger = require('../index')
const err = new Error('AN ERROR')

logger.info('hello info')
logger.warn('警告！！！')
logger.error('报错中')
logger.debug('hello debug')

makeSomeNoise()

function makeSomeNoise () {
    setTimeout(() => {
        console.log(undefinedVar)
        throw err
    }, 2E2)
}

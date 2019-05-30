const uuidv4 = require('uuid/v4')
const morgan = require('morgan')

morgan.token('traceId', function (req) { return req.cookies['X-Request-Id'] })
morgan.format('access', function accessFormatLog (tokens, req, res) {
    const fn = morgan.compile(':remote-addr - :traceId - :remote-user - [:date[clf]] " :method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

    // set traceID in cookie['X-Request-Id']
    const cookies = req.cookies || {}
    const requestTraceId = cookies['X-Request-Id']

    if (!requestTraceId) {
        const requestId = uuidv4()

        res.cookie('X-Request-Id', requestId)
    }

    return fn(tokens, req, res)
})

module.exports = morgan

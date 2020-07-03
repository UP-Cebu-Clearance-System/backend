const morgan = require('morgan')
const moment = require('moment-timezone')
const { decode } = require('jsonwebtoken')

morgan.token('user', (req, res) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.headers.authorization
    const { id, role } = decode(token)
    return `${ role } ${ id }`
})

morgan.token('date', (req, res) => {
    return `${ moment.tz('Asia/Manila').format('D/MMM/YYYY:HH:mm:ss Z') }`
})

morgan.format('common', ':remote-addr :user [:date] ":method :url HTTP/:http-version" :status :res[content-length]')

module.exports = { morgan }
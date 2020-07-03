const morgan = require('morgan')
const { decode } = require('jsonwebtoken')

morgan.token('user', (req, res) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.headers.authorization
    const { id, role } = decode(token)
    return `${ role } ${ id }`
})

morgan.format('common', ':remote-addr :user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]')

module.exports = { morgan }
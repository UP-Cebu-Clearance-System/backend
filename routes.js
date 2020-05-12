const routes = require('express').Router()

const { login } = require('./routes/login')
const { signup } = require('./routes/signup')


routes.use('/login', login)
routes.use('/signup', signup)

module.exports = { routes }
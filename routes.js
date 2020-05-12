const routes = require('express').Router()

const { login } = require('./routes/login')
const { signup } = require('./routes/signup')
const { test } = require('./routes/test')


routes.use('/login', login)
routes.use('/signup', signup)
routes.use('/test', test)

module.exports = { routes }
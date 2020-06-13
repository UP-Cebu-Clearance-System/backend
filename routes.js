const routes = require('express').Router()

const { approver } = require('./routes/approver')
const { clearance } = require('./routes/clearance')
const { login } = require('./routes/login')
const { signup } = require('./routes/signup')
const { test } = require('./routes/test')


routes.use('/approver', approver)
routes.use('/clearance', clearance)
routes.use('/login', login)
routes.use('/signup', signup)
routes.use('/test', test)

module.exports = { routes }
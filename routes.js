const routes = require('express').Router()

const { account } = require('./routes/account')
const { approver } = require('./routes/approver')
const { clearance } = require('./routes/clearance')
const { login } = require('./routes/login')
const { signup } = require('./routes/signup')
const { test } = require('./routes/test')

const { verifyToken } = require('./middleware/jwt')

routes.use('/account', account)
routes.use('/approver', verifyToken, (req, res, next) => {
        if (req.body.role !== 'approver') res.status(403).send({ message: 'Forbidden.' })
        else next()
    }, approver)
routes.use('/clearance', verifyToken, (req, res, next) => {
        if (req.body.role !== 'student') res.status(403).send({ message: 'Forbidden.' })
        else next()
    }, clearance)
routes.use('/login', login)
routes.use('/signup', signup)
routes.use('/test', test)

module.exports = { routes }
const login = require('express').Router()
const { getToken } = require('../middleware/jwt')
const { verifyPassword } = require('../middleware/password')

login.post('/', verifyPassword, getToken, (req, res, next) => {
    res.send({ accessToken: req.body.accessToken })
})

module.exports = { login }
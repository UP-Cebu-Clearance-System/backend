const login = require('express').Router()
const { getToken } = require('../middleware/jwt')
const { verifyPassword } = require('../middleware/password')
const { approverInfo, studentInfo } = require('../middleware/account')

login.post('/student', studentInfo, verifyPassword, getToken, (req, res, next) => {
    res.send({ accessToken: req.body.accessToken })
})

login.post('/approver', approverInfo, verifyPassword, getToken, (req, res, next) => {
    res.send({ accessToken: req.body.accessToken })
})

module.exports = { login }
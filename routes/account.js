const account = require('express').Router()
const { verifyToken } = require('../middleware/jwt')
const { hashPassword, verifyPassword } = require('../middleware/password')
const { approverInfo, studentInfo } = require('../middleware/account')
const { approverUpdatePassword, studentUpdatePassword } = require('../models/ClearanceDatabase')

account.post('/password', verifyToken, approverInfo, studentInfo, verifyPassword, 
    (req, res, next) => {
        req.body.password = req.body.newPassword
        delete req.body.newPassword
        next()
    }, hashPassword,
    async (req, res) => {
        const message = req.body.role === 'student' ? await studentUpdatePassword(req.body.id, req.body.password) : await approverUpdatePassword(req.body.id, req.body.password)
        res.status(200).send(message)
    }
)

module.exports = { account }
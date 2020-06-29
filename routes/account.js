const account = require('express').Router()
const { hashPassword, verifyPassword } = require('../middleware/password')
const { approverInfo, studentInfo } = require('../middleware/account')
const { approverUpdatePassword, fetchApproverInfo, fetchStudentInfo, studentUpdatePassword } = require('../models/ClearanceDatabase')

account.get('/info', async(req, res) => {
    const info = req.body.role === 'student' ? await fetchStudentInfo(req.body.id) : await fetchApproverInfo(req.body.id)
    res.status(200).send(info)
})

account.post('/password', approverInfo, studentInfo, verifyPassword, 
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
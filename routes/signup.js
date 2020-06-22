const signup = require('express').Router()
const { hashPassword } = require('../middleware/password')
const { approverRegister, studentRegister } = require('../models/ClearanceDatabase')

signup.post('/student', hashPassword, async(req, res) => {
    const result = await studentRegister(req.body.id, req.body.name, req.body.collegeID, req.body.password)
    res.send(result)
})

signup.post('/approver', hashPassword, async(req, res) => {
    const result = await approverRegister(req.body.id, req.body.password)
    res.send(result)
})

module.exports = { signup }
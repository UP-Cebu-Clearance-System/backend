const signup = require('express').Router()
const { hashPassword } = require('../middleware/password')
const { studentRegister } = require('../models/ClearanceDatabase')
const { createApprover } = require('../models/entities/approver')

signup.post('/student', hashPassword, async(req, res) => {
    const result = await studentRegister(req.body.id, req.body.name, `ct-${req.body.collegeID}-${req.body.id}`, req.body.collegeID, req.body.password)
    res.send(result)
})

signup.post('/approver', hashPassword, async(req, res) => {
    const result = await createApprover(req.body.id, req.body.name, req.body.employeeID, req.body.title, req.body.officeID, req.body.password)
    res.send(result)
})

module.exports = { signup }
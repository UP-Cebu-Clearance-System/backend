const clearance = require('express').Router()
const { verifyToken } = require('../middleware/jwt')
const { fetchStudentInfo, fetchClearance } = require('../models/ClearanceDatabase')

clearance.get('/', verifyToken, async(req, res) => {
    const { ClearanceID } = await fetchStudentInfo(req.body.id)
    const flow = await fetchClearance(ClearanceID)
    res.status(200).send(flow)
})

module.exports = { clearance }
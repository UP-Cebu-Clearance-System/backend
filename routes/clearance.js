const clearance = require('express').Router()
const { fetchStudentInfo, fetchClearance, studentApplyClearable, studentCancelClearableApplication } = require('../models/ClearanceDatabase')
const { CIDNext } = require('../middleware/next')

clearance.get('/', async(req, res) => {
    const { ClearanceID } = await fetchStudentInfo(req.body.id)
    const flow = await fetchClearance(ClearanceID)
    res.status(200).send(flow)
})

clearance.post('/apply', CIDNext, async(req, res, next) => {
    const id = req.body.id
    if(req.body.next !== null){
        const message = await studentApplyClearable(id, req.body.next)
        res.status(200).send(message)
    }
    else res.status(200).send({ message: 'Clearance done.' })
})

clearance.post('/cancel', CIDNext, async(req, res, next) => {
    if(req.body.next !== null){
        const message = await studentCancelClearableApplication(req.body.next)
        res.status(200).send(message)
    }
    else res.status(200).send({ message: 'Clearance done.' })
})

module.exports = { clearance }
const clearance = require('express').Router()
const { verifyToken } = require('../middleware/jwt')
const { fetchStudentInfo, fetchClearance, studentApplyClearable, studentCancelClearableApplication } = require('../models/ClearanceDatabase')
const { getClearanceInfoFromCID } = require('../models/tables/clearance')

clearance.get('/', verifyToken, async(req, res) => {
    const { ClearanceID } = await fetchStudentInfo(req.body.id)
    const flow = await fetchClearance(ClearanceID)
    res.status(200).send(flow)
})

clearance.post('/apply', verifyToken, async(req, res, next) => {
    const id = req.body.id
    const fti = (await fetchStudentInfo(id)).ClearanceID
    const fbi = (await getClearanceInfoFromCID(req.body.CID)).ClearanceID
    if(fti === fbi){
        const message = await studentApplyClearable(id, req.body.CID)
        res.status(200).send(message)
    }else{
        res.status(403).send({ message: 'Forbidden application.' })
    }
})

clearance.post('/cancel', verifyToken, async(req, res, next) => {
    const id = req.body.id
    const fti = (await fetchStudentInfo(id)).ClearanceID
    const fbi = (await getClearanceInfoFromCID(req.body.CID)).ClearanceID
    if(fti === fbi){
        const message = await studentCancelClearableApplication(req.body.CID)
        res.status(200).send(message)
    }else{
        res.status(403).send({ message: 'Forbidden application.' })
    }
})

module.exports = { clearance }
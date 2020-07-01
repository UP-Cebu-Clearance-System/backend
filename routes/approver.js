const approver = require('express').Router()
const { approverFetchClearanceQueue,  approverSignClearance, approverSignClearanceWithRemarks, approverRejectClearance, approverRestoreClearable } = require('../models/ClearanceDatabase')
const { getClearanceInfoFromCID } = require('../models/tables/clearance')
const { applyNext } = require('../middleware/next')

approver.get('/', async(req, res) => {
    const queue = await approverFetchClearanceQueue(req.body.id)
    res.status(200).send(queue)
})

approver.post('/sign', async(req, res, next) => {
    const id = req.body.id
    const cid = req.body.CID
    const fbi = (await getClearanceInfoFromCID(cid)).ApproverID
    if(id === fbi){
        const message = req.body.remarks ? await approverSignClearanceWithRemarks(cid, req.body.remarks) : await approverSignClearance(cid)
        next()
    }else{
        res.status(403).send({ message: 'Signing forbidden.' })
    }
}, applyNext)

approver.post('/reject', async(req, res, next) => {
    const id = req.body.id
    const cid = req.body.CID
    const fbi = (await getClearanceInfoFromCID(cid)).ApproverID
    if(id === fbi){
        const message = await approverRejectClearance(cid, req.body.remarks)
        next()
    }else{
        res.status(403).send({ message: 'Signing forbidden.' })
    }
}, applyNext)

// approver.post('/restore', async(req, res) => {
//     const id = req.body.id
//     const cid = req.body.CID
//     const fbi = (await getClearanceInfoFromCID(cid)).ApproverID
//     if(id === fbi){
//         const message = req.body.remarks ? await approverSignClearanceWithRemarks(cid, req.body.remarks) : await approverSignClearance(cid)
//         res.status(200).send(message)
//     }else{
//         res.status(403).send({ message: 'Signing forbidden.' })
//     }
// })

module.exports = { approver }
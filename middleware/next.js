const { fetchClearance, fetchStudentInfo } = require('../models/ClearanceDatabase')

const CIDNext = async(req, res, next) => {
    try {
        const { ClearanceID } = await fetchStudentInfo(req.body.id)
        const flow = await fetchClearance(ClearanceID)
        let ans = flow.map(x => ({ CID: x.CID, Status: x.Status }))
        ans = ans.filter(x => x.Status !== 'Signed')[0]
        ans = ans !== undefined ? ans.CID : null
        req.body.next = ans
        next()
    } catch {
        res.status(500).send({ message: 'Clearance application error.' })
    }
}

const applyNext = async(req, res, next) => {

}

module.exports = { applyNext, CIDNext }
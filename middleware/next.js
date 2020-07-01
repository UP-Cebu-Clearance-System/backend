const { fetchClearance, fetchStudentInfo, studentApplyClearable } = require('../models/ClearanceDatabase')
const { getClearanceInfoFromCID } = require('../models/tables/clearance')
const { getStudentInfoFromClearanceID, updateStatus } = require('../models/tables/student')

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

const applyNext = async(req, res) => {
    const { ClearanceID } = await getClearanceInfoFromCID(req.body.CID)
    const { StudentID } = await getStudentInfoFromClearanceID(ClearanceID)
    const flow = await fetchClearance(ClearanceID)
    let ans = flow.map(x => ({ CID: x.CID, Status: x.Status }))
    ans = ans.filter(x => x.Status !== 'Signed')[0]
    console.log(StudentID, ans)
    if(ans !== undefined){
        await studentApplyClearable(StudentID, ans.CID)
        res.status(200).send({ message: 'Successfully signed.' })
    }else{
        await updateStatus('Cleared', StudentID)
        res.status(200).send({ message: 'Successfully signed.' })
    }
}

module.exports = { applyNext, CIDNext }
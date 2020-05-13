const { getStudent } = require('../models/entities/student')
const { getApprover } = require('../models/entities/approver')

const studentInfo = async(req, res, next) => {
    const id = req.body.id
    const info = await getStudent(id)
    if(info){
        req.body.dbpassword = info.Password
        next()
    } else {
        res.status(404).send({ message: `Student not found.` })
    }
}

const approverInfo = async(req, res, next) => {
    const id = req.body.id
    const info = await getApprover(id)
    if(info){
        req.body.dbpassword = info.Password
        next()
    } else {
        res.status(404).send({ message: `Approver not found.` })
    }
}

module.exports = { approverInfo, studentInfo }
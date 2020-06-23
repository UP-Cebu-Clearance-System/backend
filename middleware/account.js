const { getStudent } = require('../models/tables/student')
const { getApprover } = require('../models/tables/approver')
const { getAdmin } = require('../models/tables/admin')

const studentInfo = async(req, res, next) => {
    if(req.body.role !== 'student' && req.body.role !== undefined) next()
    else {
        const id = req.body.id
        const info = await getStudent(id)
        if(info){
            req.body.dbpassword = info.Password
            next()
        } else {
            res.status(404).send({ message: `Student not found.` })
        }
    }
}

const approverInfo = async(req, res, next) => {
    if(req.body.role !== 'approver' && req.body.role !== undefined) next()
    else {
        const id = req.body.id
        const info = await getApprover(id)
        if(info){
            req.body.dbpassword = info.Password
            next()
        } else {
            res.status(404).send({ message: `Approver not found.` })
        }
    }
}

const adminInfo = async(req, res, next) => {
    const username = req.body.username
    const info = await getAdmin(username)
    if(info){
        req.body.dbpassword = info.Password
        next()
    }else{
        res.status(400).send({ message: `Admin not found.` })
    }
}

module.exports = { adminInfo, approverInfo, studentInfo }
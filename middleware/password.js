 
const { hash, compare } = require('bcrypt')
const { getStudent } = require('../models/entities/student')

const hashPassword = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        next()
    } catch {
        res.status(500).send({ message: `Can't process account.` })
    }
}

const verifyPassword = async(req, res, next) => {
    try {
        if(await compare(req.body.password, req.body.dbpassword)){
            next()
        } else {
            res.status(401).send({ message: `Wrong Password.` })
        }
    } catch {
        res.status(500).send({ message: `Can't verify account.` })
    }
}

module.exports = { hashPassword, verifyPassword }
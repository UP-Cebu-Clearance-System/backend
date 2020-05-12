const { hash, compare } = require('bcrypt')
const { getStudent } = require('../models/student')

const hashPassword = async (req, res, next) => {
    try {
        req.body.password = await hash(req.body.password, 10)
        next()
    } catch {
        res.status(500).send({ message: `Can't process account.` })
    }
}

const verifyPassword = async(req, res, next) => {
    const id = req.body.id
    const info = await getStudent(id)
    if(info){
        try {
            if(await compare(req.body.password, info.Password)){
                next()
            } else {
                res.status(401).send({ message: `Wrong Password.` })
            }
        } catch {
            res.status(500).send({ message: `Can't verify account.` })
        }
    } else {
        res.status(404).send({ message: `User not found.` })
    }
}

module.exports = { hashPassword, verifyPassword }
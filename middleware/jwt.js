require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

const getToken = (req, res, next) => {
    const payload = { id: req.body.id }
    sign(payload, process.env.SECRET, { expiresIn: '30s' }, (err, token) => {
        if(err){
            res.sendStatus(500).send({ message: `Error getting token.` })
        } else {
            req.body.accessToken = token
            next()
        }
    })
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.headers.authorization
    verify(token, process.env.SECRET, (err, data) => {
        if(err){
            res.sendStatus(401).send({ message: `Invalid Token.` })
        } else {
            next()
        }
    })
}

module.exports = { getToken, verifyToken }
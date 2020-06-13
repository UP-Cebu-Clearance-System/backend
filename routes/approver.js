const approver = require('express').Router()
const { verifyToken } = require('../middleware/jwt')

approver.get('/', verifyToken, (req, res) => {
    res.status(200).send({ message: `Approver: ${ req.body.id }` })
})

module.exports = { approver }
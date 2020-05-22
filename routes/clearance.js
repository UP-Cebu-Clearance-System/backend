const clearance = require('express').Router()
const { verifyToken } = require('../middleware/jwt')

clearance.get('/', verifyToken, (req, res) => {
    res.status(200).send({ message: `ClearanceFlow ${ req.body.id }` })
})

module.exports = { clearance }
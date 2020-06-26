const admin = require('express').Router()
const {} = require('../models/Admin')

admin.post('/add/approver', (req, res) => {
    res.status(200).send({ message: 'this is the admin' })
})

module.exports = { admin }
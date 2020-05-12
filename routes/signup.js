const signup = require('express').Router()

signup.post('/', (req, res) => {
    res.send(201)
})

module.exports = { signup }
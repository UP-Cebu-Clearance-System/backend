const test = require('express').Router()

test.get('/', (req, res) => {
    res.send({ message: 'This is test' })
})

module.exports = { test }
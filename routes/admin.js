const admin = require('express').Router()
const { readdirSync } = require('fs')
const {} = require('../models/Admin')

admin.post('/add/approver', (req, res) => {
    res.status(200).send({ message: 'this is the admin' })
})

admin.get('/download/backup', (req, res) => {
    res.download('clearance.sqlite')
})

admin.get('/download/log/:file', (req, res) => {
    res.download(`logs/${ req.params.file }`)
})

admin.get('/logs', (req, res) => {
    const files = readdirSync('logs/')
    const baseURL = `${ req.protocol }://${ req.get('host') }/admin/download/log/`
    res.status(200).send(files.map(filename => ({ filename, url: encodeURI(baseURL + filename) })))
})

module.exports = { admin }
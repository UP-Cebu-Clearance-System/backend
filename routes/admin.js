const admin = require('express').Router()
const { readdirSync } = require('fs')
const { adminAddApprover, adminAddApproverTitle, adminApproverUpdateName, adminApproverUpdateTitle, adminManualQuery } = require('../models/Admin')

admin.post('/add/approver', async(req, res) => {
    const message = await adminAddApprover(req.body.name, req.body.title, req.body.officeID, req.body.password)
    res.status(201).send(message)
})

admin.post('/add/approverTitle', async(req, res) => {
    const message = await adminAddApproverTitle(req.body.approverID, req.body.password)
    res.status(201).send(message)
})

admin.post('/add/clearanceFlow', (req, res) => {

})

admin.post('/approver/updateName', async(req, res) => {
    const message = await adminApproverUpdateName(req.body.approverID, req.body.name)
    res.status(200).send(message)
})

admin.post('/approver/updateTitle', async(req, res) => {
    const message = await adminApproverUpdateTitle(req.body.approverID, req.body.title)
    res.status(200).send(message)
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

admin.post('/query', async(req, res) => {
    const message = await adminManualQuery(req.body.query)
    res.status(200).send(message)
})

module.exports = { admin }
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { routes } = require('./routes')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/', routes)

io.on('connection', user => {
    console.log('a user is connected')
    user.on('disconnect', () => console.log('a user is disconnected'))
})

server.listen(port, () => console.log('Server running at port:', port))
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { morgan } = require('./middleware/logger')
const { createStream } = require('rotating-file-stream')
const { routes } = require('./routes')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000

if(process.env.NODE_ENV === 'production'){
    const accessLogStream = createStream('access.log', {
        interval: '1d',
        path: `${ __dirname }/logs`
    })
    app.use(morgan('common', { stream: accessLogStream }))
}
else app.use(morgan('dev'))

app.use(cors())
app.use(express.json())

app.use('/', routes)

io.on('connection', user => {
    console.log('a user is connected')
    user.on('disconnect', () => console.log('a user is disconnected'))
})

server.listen(port, () => console.log('Server running at port:', port))
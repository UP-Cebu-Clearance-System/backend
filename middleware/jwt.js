const { sign, verify } = require('jsonwebtoken')

const getToken = (req, res, next) => {
    const payload = { id: req.body.id || req.body.username, role: req.route.path.split('/')[1] }
    sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
        if(err){
            res.status(500).send({ message: `Error getting token.` })
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
            res.status(401).send({ message: `Invalid Token.` })
        } else {
            req.body.id = data.id
            req.body.role = data.role
            next()
        }
    })
}

module.exports = { getToken, verifyToken }
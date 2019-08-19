const express = require('express')

const server = express()

const AuthRouter = require('./auth/auth-route')

server.use(express.json())
server.use('/api', AuthRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'all good'})
})

module.exports = server
const express = require('express')
const session = require('express-session')

const server = express()

const AuthRouter = require('./auth/auth-route')

const sessionOptions = {
    name: 'sessionname',
    secret: process.env.COOKIE_SECRET || 'this is a secret',
    cookie: {
        secure: process.env.COOKIE_SECURE || false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true
}

server.use(express.json())
server.use(session(sessionOptions))
server.use('/api', AuthRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'all good'})
})

module.exports = server
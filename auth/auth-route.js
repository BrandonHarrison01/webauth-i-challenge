const express = require('express')
const bcrypt = require('bcryptjs')

const Users = require('./auth-model')
const restricted = require('./restricted-middleware')

const router = express.Router()

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 4)
    user.password = hash;

    Users.add(user)
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json(error))
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compare(password, user.password)) {
                req.session.username = user.username
                res.status(201).json({ message: `Hello ${username}`})
            } else {
                res.status(401).json({ error: 'Invalid Credentials' })
            }
        })
        .catch(error => {res.status(500).json(error)})
    })


router.get('/users', restricted, (req, res) => {
    Users.find()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error))
})


module.exports = router
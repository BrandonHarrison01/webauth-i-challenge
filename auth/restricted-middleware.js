const bcrypt = require('bcryptjs')

const Users = require('./auth-model')

module.exports = function restricted(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).json({ error: 'Invalid Credentials' })
    }
}
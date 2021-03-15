const {User, validate} = require('../models/userModel')
const auth = require('../middleware/auth')
const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcrypt')
const router = express.Router();


router.post('/', auth, async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt)



    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ username: req.body.username })
    if(user) return res.status(400).send("User already registered")

    user = new User({
        name: req.body.name,
        username: req.body.username,
        isAdmin: false,
        password: hashed
    });
    user = await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']))
})

module.exports = router
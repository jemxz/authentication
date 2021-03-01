const Joi = require('joi');
const mongoose = require('mongoose');

const User = new mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type:String,
        required: true,
        minlength: 5,
        maxlength:1024,
    }
}))


function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;
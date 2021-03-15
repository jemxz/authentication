const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    password: {
        type:String,
        required: true,
        minlength: 5,
        maxlength:1024,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id:this._id, isAdmin:this.isAdmin, name: this.name }, config.get('jwtPrivateKey'))
    return token
}
const User = new mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validateUser;
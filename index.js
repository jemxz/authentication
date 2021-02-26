const Joi = require('joi');
const mongoose = require('mongoose')
const express = require('express');
const user = require('./routes/user')
const router = express.Router();
const app = express()

mongoose.connect('mongodb://localhost/facebook-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))

app.use('/api/user', user);


const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});

    


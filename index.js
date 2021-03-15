const user = require('./routes/user')
const auth = require('./routes/auth')
const config = require('config')
const Joi = require('joi');
const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const cors = require("cors")
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser =require('body-parser')

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1)
}

mongoose.connect('mongodb://localhost/user', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)



app.use('/api/user', user);
app.use('/api/auth', auth);


const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});

    


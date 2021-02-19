/**
 * Native Imports
 */
const fs = require('fs');
const path = require('path');

/**
 * Import dependencies
 */
const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const routes = require('./routes.js')
const port = process.env.PORT || 3000;
/**
 * Server setup
 */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.use(express.urlencoded({ extended: true }))
    // set query string method for method-override
app.use(methodOverride('_method'))


/** 
 * Set up mongoDB connection and require comments model
 */
mongoose.connect('mongodb://localhost:27017/commentsApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
mongoose.Model('Comment')


/**
 * Employ router class  
 */
app.use(routes.router);

app.listen(port, () => {
    console.log("server listening on port " + port)
})
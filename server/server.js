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
const { v4: uuidv4 } = require('uuid');
uuidv4();
const ejs = require('ejs');
const methodOverride = require('method-override');
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
 * Employ router class  
 */
app.use(routes.router);

app.listen(port, () => {
    console.log("server listening on port " + port)
})
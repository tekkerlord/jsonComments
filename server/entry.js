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
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const ejs = require('ejs');
const methodOverride = require('method-override');
const routes = require('./routes.js')

/**
 * Server setup
 */
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', path.join(__dirname, '../views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes.router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server listening on port " + port)
})
/**
 * Import express module and instantiate router
 */
const express = require('express');
const router = express.Router();
const util = require('./utilities.js');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const response = require('./response.js')


// pull json to be used in routes
let json = util.retrieveJsonData()

// call error handling middleware from response file
router.use(response.checkForComments)

// root route
router.get("/", (req, res) => {
    res.send("loaded")
})

// index route
router.get("/comments", (req, res) => {
    response.index(req, res)
})

// new route
router.get('/new', (req, res) => {
    res.render('new')
})

// create route
router.post('/comments', (req, res) => {
    response.create(req, res)
})

// show route
router.get('/comments/:id', (req, res) => {
    response.show(req, res)
})

// edit route
router.get("/comments/:id/edit", (req, res) => {
    response.edit(req, res)
})

// update route for comments
router.patch('/comments/:id', (req, res) => {
    response.update(req, res)
})

//delete route
router.delete('/comments/:id', (req, res) => {
    response.deleteComment(req, res)
});

// wildcard route
router.get('*', (req, res) => {
    res.send("page doesn't exist silly!")
})

module.exports = { router }
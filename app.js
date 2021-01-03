// import and require express module
const express = require('express');
const app = express();

// require file system module
const fs = require('fs');

// require uuidv4
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// require ejs
const ejs = require('ejs');

//require method override
const methodOverride = require('method-override');

// set ejs as vew engine
app.set('view engine', 'ejs')

// use public directory for serving static assets
app.use(express.static('public'))

// import and require path module
const path = require('path');
const { v4 } = require('uuid');
const { S_IFLNK } = require('constants');

//set views directory
app.set('views', path.join(__dirname, 'views'))

// set port to listen on
const port = process.env.PORT || 4000;

// parse body
app.use(express.urlencoded({ extended: true }))

// apply method override
app.use(methodOverride('_method'))

// linking JSON
const link = "database.json";

// function to retrieve json data
function retrieveJsonData(link) {
    let file = fs.readFileSync(link);
    let json = JSON.parse(file);
    return json;
}

// function to update json file
function sendToJson(link, json) {
    let stringifiedTodos = JSON.stringify(json)
    fs.writeFileSync(link, stringifiedTodos);

}

// Pull and parse object from database
let json = retrieveJsonData(link);

// root route
app.get("/", (req, res) => {
    res.send("loaded")
})

// index route
app.get("/comments", (req, res) => {
    res.render('index', { comments: json.comments })
})

// new route
app.get('/new', (req, res) => {
    res.render('new')
})

// create route
app.post('/comments', (req, res) => {
    // deconstruct username and comment from req.body
    const { username, comment } = req.body;
    // push new comment into comment array
    json.comments.push({
        username: username,
        comment: comment,
        id: uuidv4()
    })
    sendToJson(link, json)
    res.redirect('/comments')
})

// show route
app.get('/comments/:id', (req, res) => {
    // deconstruct id from req.body
    const { id } = req.params;
    // find ID from comments array
    const comment = json.comments.find(c => c.id === id);
    res.render('show', { comment });
})

// edit route
app.get("/comments/:id/edit", (req, res) => {
    // deconstruct id from request params
    const { id } = req.params;
    // find ID from comments array
    const comment = json.comments.find(c => c.id === id);
    res.render('edit', { comment })
})

// update route for comments
app.patch('/comments/:id', (req, res) => {
    // deconstruct id from req.body
    const { id } = req.params;
    // store updated comment text in a var
    const newComment = req.body.comment;
    // find ID from comments array
    const foundComment = json.comments.find(c => c.id === id);
    // change comment text
    foundComment.comment = newComment;
    //update JSON
    sendToJson(link, json)
        // redirect back to index
    res.redirect('/comments')
})

//delete route
app.delete('/comments/:id', (req, res) => {
    // deconstruct id from request params
    const { id } = req.params;
    // find ID of comment from comment array
    const comment = json.comments.find(c => c.id === id);
    // move all comments without matching id into updated array
    comments = json.comments.filter(c => c.id !== id);
    // update json to house updated array
    json.comments = comments;
    //send new comments to database
    sendToJson(link, json);
    // redirect to index
    res.redirect('/comments');

});


app.get('*', (req, res) => {
    res.send("page doesn't exist silly!")
})

app.listen(port, () => {
    console.log("server listening on port " + port)
})
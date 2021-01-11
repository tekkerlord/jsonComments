/**
 * Import express module and instantiate router
 */
const util = require('./utilities.js');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

// need to pull json data from json.database initially to use in routes
let json = util.retrieveJsonData(util.link);

function index(req, res) {
    res.render('index', { comments: json.comments });
}

function create(req, res) {
    if (!req.body.username || !req.body.comment) {
        res.sendStatus(400)
        alert("Request must conatain username and comment")
    } else if (req.body.username && req.body.comment) {

        const { username, comment } = req.body;
        comment.trim();
        username.trim();
        json.comments.push({
            username: username,
            comment: comment,
            id: uuidv4()
        })
        util.writeToJson(link, json)
        res.status(200)
        res.redirect('/comments');
    }
}

function show(req, res) {
    if (!req.params.id) {
        res.sendStatus(400)
        alert("No ID contained in request")
    } else if (req.params.id) {
        const { id } = req.params;
        const comment = util.findId(json, id, res)
        res.status(200)
        res.render('show', { comment });
    }
}

function edit(req, res) {
    if (!req.params.id) {
        res.sendStatus(400)
        alert("No ID contained in request")
    } else if (req.params.id) {
        const { id } = req.params;
        const comment = util.findId(json, id, res)
        res.status(200)
        res.render('edit', { comment });
    }
}

function update(req, res) {
    if (!req.params.id) {
        res.sendStatus(400)
        alert("No ID contained in request")
    } else if (req.params.id) {
        const { id } = req.params;
        const newComment = req.body.comment.trim();
        const foundComment = util.findId(json, id, res)
        foundComment.comment = newComment;
        util.writeToJson(link, json)
        res.status(200)
        res.redirect('/comments')
    }
}

function deleteComment(req, res) {
    if (!req.params.id) {
        res.sendStatus(400)
        alert("No ID contained in request")
    } else if (req.params.id) {
        const { id } = req.params;
        const comment = util.findId(json, id, res)
            // moves all comments without matching id into updated array
        comments = json.comments.filter(c => c.id !== id);
        json.comments = comments;
        util.writeToJson(link, json);
        res.status(200)
        res.redirect('/comments');
    }
}

function checkForComments(req, res, next) {
    if (!json.comments) {
        res.sendStatus(500)
    } else {
        next()
    }
}

module.exports = { index, create, show, edit, update, deleteComment, checkForComments };
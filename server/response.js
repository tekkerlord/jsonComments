/**
 * Import mongoose and require comment model
 */
const mongoose = require('mongoose')
mongoose.Model('Comment')

/**
 * Import express module and instantiate router
 */
const util = require('./utilities.js');
const { Comment } = require('../models/comments.js');

async function index(req, res) {
    const comments = await Comment.find({})
    res.render('index', { comments });
}

// creates new comment in json database
// function create(req, res) {
//     if (!req.body.username || !req.body.comment) {
//         res.sendStatus(400)
//         alert("Request must conatain username and comment")
//     } else if (req.body.username && req.body.comment) {

//         const { username, comment } = req.body;
//         comment.trim();
//         username.trim();
//         json.comments.push({
//             username: username,
//             comment: comment,
//             id: uuidv4()
//         })
//         util.writeToJson(json)
//         res.status(200)
//         res.redirect('/comments');
//     }
// }

// checks for matching comment in json file and passes information to show page to be rendered
// function show(req, res) {
//     if (!req.params.id) {
//         res.sendStatus(400)
//         alert("No ID contained in request")
//     } else if (req.params.id) {
//         const { id } = req.params;
//         const comment = util.findId(json, id, res)
//         res.status(200)
//         res.render('show', { comment });
//     }
// }

// finds matching comment in json database and passes information to edit page to be rendered
// function edit(req, res) {
//     if (!req.params.id) {
//         res.sendStatus(400)
//         alert("No ID contained in request")
//     } else if (req.params.id) {
//         const { id } = req.params;
//         const comment = util.findId(json, id, res)
//         res.status(200)
//         res.render('edit', { comment });
//     }
// }

// finds matching comment ID in json and changes comment text to new comment from edit form
// function update(req, res) {
//     if (!req.params.id) {
//         res.sendStatus(400)
//         alert("No ID contained in request")
//     } else if (req.params.id) {
//         const { id } = req.params;
//         const newComment = req.body.comment.trim();
//         const foundComment = util.findId(json, id, res)
//         foundComment.comment = newComment;
//         util.writeToJson(json)
//         res.status(200)
//         res.redirect('/comments')
//     }
// }

// finds matching comment to be deleted in json and filters array of comments to include all comments that don't match ID of comment to be deleted and replaces current comment array with new filtered array
// function deleteComment(req, res) {
//     if (!req.params.id) {
//         res.sendStatus(400)
//         alert("No ID contained in request")
//     } else if (req.params.id) {
//         const { id } = req.params;
//         const comment = util.findId(json, id, res)
//             // moves all comments without matching id into updated array
//         comments = json.comments.filter(c => c.id !== id);
//         json.comments = comments;
//         util.writeToJson(json);
//         res.status(200)
//         res.redirect('/comments');
//     }
// }

// error handling middleware that checks to make sure comments array exists
// function checkForComments(req, res, next) {
//     if (!json.comments) {
//         res.sendStatus(500)
//     } else {
//         next()
//     }
// }

module.exports = { index, create, show, edit, update, deleteComment, checkForComments };
/**
 * Import fs module
 */
const fs = require('fs')

/**
 * Reusable functions to ex 
 */

link = "database.json";

function retrieveJsonData(link) {
    try {
        let file = fs.readFileSync(link);
        let json = JSON.parse(file);
        return json
    } catch (error) {
        console.log(error)
    }
}

function writeToJson(link, json) {
    try {
        let stringifiedTodos = JSON.stringify(json)
        fs.writeFileSync(link, stringifiedTodos);
    } catch (error) {
        console.log(error)
    }
}

function findId(json, id, res) {
    if (json.comments.find(c => c.id === id)) {
        const comment = json.comments.find(c => c.id === id)
        return comment;
    } else if (!json.comments.find(c => c.id === id)) {
        res.sendStatus(500)
        alert("No matching ID found in database")
    }
}

module.exports = { writeToJson, retrieveJsonData, link, findId };
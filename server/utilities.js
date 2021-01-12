/**
 * Import fs module
 */
const fs = require('fs')

/**
 * Reusable functions to ex 
 */
function checkForJsonFile() {
    if (!fs.existsSync("server/db/database.json")) {
        fs.writeFileSync("server/db/database.json", JSON.stringify({ comments: [] }))
    }
}


function retrieveJsonData() {
    checkForJsonFile();

    try {
        let file = fs.readFileSync("server/db/database.json");
        let json = JSON.parse(file);
        return json
    } catch (error) {
        console.log(error)
    }
}

function writeToJson(json) {
    try {
        let stringifiedTodos = JSON.stringify(json)
        fs.writeFileSync("server/db/database.json", stringifiedTodos);
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

module.exports = { writeToJson, retrieveJsonData, findId };
// require the express module, create a meetings router and export it
const express = require('express')
const meetingsRouter = express.Router()
module.exports = meetingsRouter
// importing functionality from db.js to be used in requests to server
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})
// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
})
// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send()
})
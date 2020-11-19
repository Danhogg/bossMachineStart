// require the express module, create a minions router and export it
const express = require('express')
const minionsRouter = express.Router()
module.exports = minionsRouter

// importing functionality from db.js to be used in requests to server
const { addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db')

// This is middleware applying to all calls to /minions/:id to save repeating code
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id)
    if (minion) {
        req.minion = minion
        next()
    }
    else {
        res.status(404).send()
    }
})

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'))
})

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)
})

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
})

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinion)
})

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deletedMinion) {
        res.status(204)
    }
    else {
        res.status(500)
    }
    res.send()
})
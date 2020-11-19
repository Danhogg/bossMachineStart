// require the express module, create an ideas router and export it
const express = require('express')
const ideasRouter = express.Router()
module.exports = ideasRouter

// importing functionality from db.js to be used in requests to server
const { addToDatabase, getAllFromDatabase, getFromDatabaseById, updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db')

const checkMillionDollarIdea = require('./checkMillionDollarIdea')

// This is middleware applying to all calls to /ideas/:id to save repeating code
ideasRouter.param('id', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if (idea) {
        req.idea = idea
        next()
    }
    else {
        res.status(404).send()
    }
})

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
})

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})

// GET /api/ideas/:id to get a single idea by id.
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea)
})

// PUT /api/ideas/:id to update a single idea by id.
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body)
    res.send(updatedIdea)
})

// DELETE /api/ideas/:id to delete a single idea by id.
ideasRouter.delete('/:id', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.id)
    if (deletedIdea) {
        res.status(204)
    }
    else {
        res.status(500)
    }
    res.send()
})
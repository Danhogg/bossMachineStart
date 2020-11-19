const express = require('express');
const apiRouter = express.Router();

// importing the Routers used in our other files
const ideasRouter = require('./ideas.js')
const meetingsRouter = require('./meetings.js')
const minionsRouter = require('./minions.js')

// mounting these Routers to apiRouter
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)
apiRouter.use('/minions', minionsRouter)

module.exports = apiRouter;

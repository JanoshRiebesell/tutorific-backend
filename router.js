'use strict';

const Router = require('koa-router');

const personsController = require('./controllers/persons.controller');
const connectionsController = require('./controllers/connections.controller');
const authorizationController = require('./controllers/authorization.controller');

const authMiddleware = require('./middlewares/authorization').authorize;

const router = new Router;

router.get('/person/:id', personsController.getPerson);
router.get('/persons', personsController.getPersons);
router.post('/person', personsController.createPerson);
router.put('/person/:id', authMiddleware, personsController.updatePerson);
router.delete('/person/:id', authMiddleware, personsController.deletePerson);

router.get('/connection/:id', connectionsController.getConnection);
router.get('/connections', connectionsController.getConnections);
router.post('/connection', authMiddleware, connectionsController.createConnection);
router.put('/connection/:id', authMiddleware, connectionsController.updateConnection);
router.delete('/connection/:id', authMiddleware, connectionsController.deleteConnection);

router.get('/login', authorizationController.login);

module.exports = router;
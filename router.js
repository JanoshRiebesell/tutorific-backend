'use strict';

const Router = require('koa-router');

const tutorsController = require('./controllers/tutors.controller');
const studentsController = require('./controllers/students.controller');
const connectionsController = require('./controllers/connections.controller');
const authorizationController = require('./controllers/authorization.controller');

const authMiddleware = require('./middlewares/authorization').authorize;

const router = new Router;

router.get('/student/:id', studentsController.getStudent);
router.get('/students', studentsController.getStudents);
router.post('/student', studentsController.createStudent);
router.put('/student/:id', authMiddleware, studentsController.updateStudent);
router.delete('/student/:id', authMiddleware, studentsController.deleteStudent);

router.get('/tutor/:id', tutorsController.getTutor);
router.get('/tutors', tutorsController.getTutors);
router.post('/tutor', tutorsController.createTutor);
router.put('/tutor/:id', authMiddleware, tutorsController.updateTutor);
router.delete('/tutor/:id', authMiddleware, tutorsController.deleteTutor);

router.get('/connection/:id', connectionsController.getconnection);
router.get('/connections', connectionsController.getconnections);
router.post('/connection', authMiddleware, connectionsController.createConnection);
router.put('/connection/:id', authMiddleware, connectionsController.updateConnection);
router.delete('/connection/:id', authMiddleware, connectionsController.deleteConnection);

router.get('/login', authorizationController.login);

module.exports = router;
'use strict';

const Router = require('koa-router');
const tutorsController = require('./controllers/tutors.controller');
const studentsController = require('./controllers/students.controller');
const connectionsController = require('./controllers/connections.controller');

const router = new Router;

router.get('/tutor/:id', tutorsController.getTutor);
router.get('/tutors', tutorsController.getTutors);
router.get('/student/:id', studentsController.getStudent);
router.get('/students', studentsController.getStudents);

router.post('/tutor', tutorsController.createTutor);
router.post('/student', studentsController.createStudent);
router.post('/connection', connectionsController.createConnection);

router.put('/tutor/:id', tutorsController.updateTutor);
router.put('/student/:id', studentsController.updateStudent);
router.put('/connection/:id', connectionsController.updateConnection);

router.delete('/tutor/:id', tutorsController.deleteTutor);
router.delete('/student/:id', studentsController.deleteStudent);
router.delete('/connection/:id', connectionsController.deleteConnection);

module.exports = router;
'use strict';

const Router = require('koa-router');
const tutorController = require('./controllers/tutors.controller');
const studentController = require('./controllers/students.controller');
const connectionController = require('./controllers/connections.controller');

const router = new Router;

router.get('/tutor/:id', tutorController.getTutor);
router.get('/tutors', tutorController.getTutors);
router.get('/student/:id', studentController.getStudent);
router.get('/students', studentController.getStudents);

router.post('/tutor', tutorController.createTutor);
router.post('/student', studentController.createStudent);
router.post('/connection', connectionController.createConnection);

router.put('/tutor/:id', tutorController.updateTutor);
router.put('/student/:id', studentController.updateStudent);
router.put('/connection/:id', connectionController.updateConnection);

router.delete('/tutor/:id', tutorController.deleteTutor);
router.delete('/student/:id', studentController.deleteStudent);
router.delete('/connection/:id', connectionController.deleteConnection);

module.exports = router;
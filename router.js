'use strict';

const Router = require('koa-router');
const tutorController = require('./controllers/tutor.controller');
const studentController = require('./controllers/student.controller');
const connectionController = require('./controllers/connection.controller');

const router = new Router;

router.get('/tutor', tutorController.getTutor);
router.get('/tutors', tutorController.getTutors);
router.get('/student', studentController.getStudent);
router.get('/students', studentController.getStudents);

router.post('/tutor', tutorController.createTutor);
router.post('/student', studentController.createStudent);
router.post('/connection', connectionController.createConnection);

router.put('/tutor', tutorController.updateTutor);
router.put('/student', studentController.updateStudent);
router.put('/connection', connectionController.updateConnection);

router.delete('/tutor', tutorController.deleteTutor);
router.delete('/student', studentController.deleteStudent);
router.delete('/connection', connectionController.deleteConnection);

module.exports = router;
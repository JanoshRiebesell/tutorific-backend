'use-strict';

const Router = require('koa-router');
const tutorController = require('./controllers/tutor.controller');
const studentController = require('./controllers/student.controller');
const connectionController = require('./controllers/connection.controller');

const router = new Router;

router.get('/tutor', (ctx, next) => tutorController.getTutor);
router.get('/tutors', (ctx, next) => tutorController.getTutors);
router.get('/student', (ctx, next) => studentController.getStudent);
router.get('/students', (ctx, next) => studentController.getStudents);

router.post('/tutor', (ctx, next) => tutorController.createTutor);
router.post('/student', (ctx, next) => studentController.createStudent);
router.post('/connection', (ctx, next) => connectionController.createConnection);

router.put('/tutor', (ctx, next) => tutorController.updateTutor);
router.put('/student', (ctx, next) => studentController.updateStudent);
router.put('/connection', (ctx, next) => connectionController.updateConnection);

router.delete('/tutor', (ctx, next) => tutorController.deleteTutor);
router.delete('/student', (ctx, next) => studentController.deleteStudent);
router.delete('/connection', (ctx, next) => connectionController.deleteConnection);

module.exports = router;
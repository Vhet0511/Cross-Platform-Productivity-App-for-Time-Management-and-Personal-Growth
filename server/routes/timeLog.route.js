const express = require('express');
const router = express.Router();
const timeLogController = require('../controllers/timeLog.controller');

router.post('/', timeLogController.createTimeLog);
router.get('/', timeLogController.getAllTimeLogs);
router.get('/user/:userId', timeLogController.getLogsByUser);
router.get('/:id', timeLogController.getTimeLogById);
router.put('/:id', timeLogController.updateTimeLog);
router.delete('/:id', timeLogController.deleteTimeLog);

module.exports = router;

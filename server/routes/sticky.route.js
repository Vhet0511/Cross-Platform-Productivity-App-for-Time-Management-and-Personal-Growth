const express = require('express');
const router = express.Router();
const stickyController = require('../controllers/sticky.controller');

router.post('/', stickyController.createSticky);
router.get('/', stickyController.getAllStickies);
router.get('/:id', stickyController.getStickyById);
router.put('/:id', stickyController.updateSticky);
router.delete('/:id', stickyController.deleteSticky);
router.get('/user/:userId', stickyController.getStickiesByUserId);


module.exports = router;

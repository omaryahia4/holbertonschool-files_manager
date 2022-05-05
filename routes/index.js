import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello');
});

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', UsersController.postNew);

module.exports = router;

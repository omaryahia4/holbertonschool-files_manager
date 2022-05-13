import AppController from '../controllers/AppController.js';
import postNew from '../controllers/UsersController.js';
import express from 'express';

import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello');
});

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', jsonParser, postNew);

export default router;

import AppController from '../controllers/AppController.js';
import UserController from '../controllers/UsersController.js';
import express from 'express';
import getConnect from '../controllers/AuthController.js';
import getDisconnect  from '../controllers/AuthController.js';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello');
});

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', jsonParser, UserController.postNew);

router.get('/connect', getConnect);

router.get('/disconnect', getDisconnect);

router.get('/users/me', UserController.getMe);

export default router;

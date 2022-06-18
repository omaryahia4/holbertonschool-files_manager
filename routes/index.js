import express from 'express';
import AppController from '../controllers/AppController.js';
import UserController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello');
});

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);

router.post('/users', jsonParser, UserController.postNew);

router.get('/users/me', jsonParser, UserController.getMe);

router.get('/connect', AuthController.getConnect);

router.get('/disconnect', AuthController.getDisconnect);

export default router;

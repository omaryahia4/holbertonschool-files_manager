import dbClient from '../utils/db.js';
import sha1 from 'sha1';
import redisClient from '../utils/redis.js';
import ObjectId from 'mongodb'

class UserController {
  static async postNew(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    return res.status(400).send({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).send({ error: 'Missing password' });
  }
  const emailExists = await dbClient.db.collection('users').findOne({ email });
  if (emailExists) {
    return res.status(400).send({ error: 'Already exist' });
  }
  const hash = sha1(password);
  const user = await dbClient.db.users.insertOne({ email, password: hash });
  return res.status(201).send({ id: user.ObjectId, email });
};

  static async getMe(req, res) {
    const userToken = req.headers['x-token'];
    if (!userToken) return res.status(401).send({ error: 'Unauthorized' });
    const tokenID = await redisClient.get(`auth_${userToken}`);
    if (!tokenID) return res.status(401).send({ error: 'Unauthorized' });
    const user = await dbClient.db
      .collection('users')
      .findOne({ _id: ObjectId(userToken) });
    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    return res.status(200).send({ id: user._id, email: user.email });
    }
  };

export default UserController

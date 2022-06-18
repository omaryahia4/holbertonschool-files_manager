import dbClient from '../utils/db.js';
import sha1 from 'sha1';
import redisClient from '../utils/redis.js';

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
  const user = await dbClient.db.collection('users').insertOne({ email, password: hash });
  return res.status(201).send({ id: user.ObjectId, email });
};

static async getMe(req, res) {
  const userToken = req.header('X-Token');
  console.log(userToken);
    if (!userToken) return res.status(401).send({ error: 'Unauthorized' });

    const tokenID = await redisClient.get(`auth_${userToken}`);
    if (!tokenID) return res.status(401).send({ error: 'Unauthorized' });
    console.log(tokenID);
    const user = await dbClient.db
      .collection('users')
      .find({ _id: '27e5885c0c205170d6102f1' });
    console.log(user);
    console.log(user);
    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    return res.status(200).send({ id: user._id, email: user.email });
  }
};
export default UserController

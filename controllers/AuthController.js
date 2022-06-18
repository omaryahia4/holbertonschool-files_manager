import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';
import { v4 as uuid_v4 } from 'uuid';
import sha1 from 'sha1';

class AuthController {
   static async getConnect(req, res) {
    const reqUser = req.headers.authorization.split(' ')[1];
    const reqUserEmail = Buffer.from(reqUser, 'base64').toString().split(':')[0];
    
    const reqUserPass = Buffer.from(reqUser, 'base64').toString().split(':')[1];
    if (
      !dbClient.db.collection('users').findOne({email: reqUserEmail}) &&
      !dbClient.db.collection('users').findOne({password: reqUserPass})
    ) {return res.status(401).send('Unauthorized');}

    const userToken = uuid_v4();
    const USER = await dbClient.db
      .collection('users')
      .findOne({ email: reqUserEmail, password: sha1(reqUserPass) });
    const key = `auth_${userToken}`;
    await redisClient.set(key,  86400, USER._id.toString());
    return res
      .status(200)
      .send({ token: userToken});
}

static async getDisconnect(req, res) {
  const userToken = req.headers['x-token'];
  if (!userToken) return res.status(401).send({ error: 'Unauthorized' });
  const key = `auth_${userToken}`
  await redisClient.del(key);
  return res.status(204).send({})

}
}

export default AuthController;

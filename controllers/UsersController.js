import dbClient from '../utils/db.js';
import sha1 from 'sha1';

const postNew = async (req, res) => {
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
export default postNew;

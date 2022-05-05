import dbClient from '../utils/db';

const sha1 = require('sha1');

const postNew = (res, req) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).send({ error: 'Missing password' });
  }
  const emailExists = dbClient
    .collection('users')
    .findOne({ email });
  if (emailExists) {
    return res.status(400).send({ error: 'Already exist' });
  }
  const hash = sha1(password);
  const user = dbClient.db
    .collection('users')
    .insertOne([{ email, password: hash }]);
  return res.status(201).send({ id: user.insertedId, email });
};
module.exports = { postNew };

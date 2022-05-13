import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

const getStatus = (req, res) => {
  const statusResult = {
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  };
  return res.status(200).send(statusResult);
};

const getStats = async (req, res) => {
  const statsResult = {
    users: await dbClient.nbUsers(),
    files: await dbClient.nbFiles(),
  };
  return res.status(200).send(statsResult);
};

export default { getStatus, getStats }

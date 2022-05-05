import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const getStatus = (req, res) => {
  const statusResult = {
    redis: redisClient.isAlive(),
    db: dbClient.isAlive(),
  };
  res.status(200).send(statusResult);
};

const getStats = async (req, res) => {
  const statsResult = {
    users: await dbClient.nbUsers(),
    files: await dbClient.nbFiles(),
  };
  res.status(200).send(statsResult);
};

module.exports = {
  getStatus,
  getStats,
};

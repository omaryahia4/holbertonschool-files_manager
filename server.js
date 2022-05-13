import router from './routes/index.js';
import express from 'express';
const app = express();
const port = 5000 || process.env.PORT;

app.use(router);

app.listen(port, (error) => {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});


const express = require('express');

const app = express();
const router = require('./routes/index');

const port = 5000 || process.env.PORT;
app.use(router);
app.use(express.json());
app.listen(port, (error) => {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});

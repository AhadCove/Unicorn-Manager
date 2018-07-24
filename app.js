const express = require('express');

const app = express();
const PORT = 4500;

app.use(express.json());

app.use('/unicorns', require('./routes/unicorns'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

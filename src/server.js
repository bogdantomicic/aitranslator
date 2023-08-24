const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Omogući CORS za sve origin-e
app.use(cors());

app.post('/whisper/asr', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/whisper/asr',
      req.body,
      {
        headers: {
          Authorization: req.header('Authorization'),
          'Content-Type': req.header('Content-Type'),
        },
      }
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

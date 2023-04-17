import * as dotenv from 'dotenv';
dotenv.config(); // access to .env variables

import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(config);

// use express to run middleware on every request
import express from 'express';
import cors from 'cors';

// bring in security mechanism, CORS | Cross Origin Resource Sharing
const app = express();
app.use(cors());
app.use(express.json); // only want incoming data in in json format

app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data.data[0].url;
    res.send({ image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));


// const jwt = require("jsonwebtoken");

const express = require("express");
require('dotenv').config();
const cors = require("cors");

const { OAuth2Client } = require("google-auth-library");
const app = express();

app.use(
  cors({
    origin: [process.env.URL_ORIGIN],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(express.json());

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

app.post('/oauth/google', async (req, res) => {
  console.log("llegó al server ")
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  
  res.json(tokens);
});

app.listen(process.env.PORT, () => console.log(`Server is running`));
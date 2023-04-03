
// const jwt = require("jsonwebtoken");

const express = require("express");
require('dotenv').config();
const cors = require("cors");

const { OAuth2Client } = require("google-auth-library");
const app = express();

const axios = require('axios');
const url = require('url');
const cookieParser = require('cookie-parser');


app.use(
  cors({
    // origin: [process.env.URL_ORIGIN],
   origin: '*',
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

app.get('/oauth2callback', async (req, res) => {
  const today = new Date();
  const { tokens } = await oAuth2Client.getToken(req.query.code);
  res
    .cookie('@react-oauth/google_ACCESS_TOKEN', tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    })
    .cookie('@react-oauth/google_REFRESH_TOKEN', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      expires: new Date(today.getFullYear(), today.getMonth() + 6),
    })
    .redirect(301, process.env.URL_ORIGIN);
});


app.post('/oauth/google', async (req, res) => {
  
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);

  /* const userInfo = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    { headers: { Authorization: `Bearer ${tokens}` } },
  );

  console.log('user info', userInfo);
   */

  if (tokens.access_token) {
    axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`, {          
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            console.log('Datos de usuario', (res.data));
        })
        .catch((err) => console.log(err));
  } 

  res.json(tokens);
});

app.listen(process.env.PORT, () => console.log(`Server is running`));
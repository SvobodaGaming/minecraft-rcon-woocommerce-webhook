const express = require('express');
const bodyParser = require('body-parser');
const { valueMap } = require('./config');
const { execute } = require('./src/executor');
require('dotenv').config();

const app = express();

const WEB_PORT      = process.env.WEB_PORT || 3000;

const PORTS     = (process.env.MC_PORTS).split(', ');
const HOST      = process.env.MC_HOST;
const PASSWORDS = (process.env.MC_PASSWORDS).split(', ');

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Recieved command from: ', ip);

  let type = '';
  let value = '';
  let nickname = req.body.nickname;

  (req.body.item_names).includes('Unban') ? type = 'unban' : type = 'coins';

  const str = req.body.item_names;
  const match = str.match(/\d+/);

  if (valueMap.hasOwnProperty(match[0].trim() )) {
    value = valueMap[match[0].trim()];
  } else {
    console.log("Value not found");
  }
  
  execute(HOST, PORTS, PASSWORDS, nickname, value, type);

  res.status(200).send('OK');
});

app.listen(WEB_PORT, () => {
  console.log(`Server started on port ${WEB_PORT}`);
});

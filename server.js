const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors())
// error handling for CORS errors
app.use(express.json());
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Recurly Take Home';

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.account = []
app.locals.updatedAddress = []
// for storing the account and updatedAddress

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://v3.recurly.com/accounts/code-1612',
  'headers': {
    'Accept': 'application/vnd.recurly.v2021-02-25',
    'Content-Type': 'application/json',
    'Authorization': 'Basic OTBhZmRjYTkxMWZmNDJlNzlkN2ExMzRkY2YzOTRjMTc6'
  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  app.locals.account = JSON.parse(response.body)
});
// request for GET to API 

app.get('/api/v1/account', (request, response) => {
    const account = app.locals.account;
    response.json({ account });
});
// response for GET

app.put('/api/v1/account', (request, response) => {
  app.locals.updatedAddress = request.body;
  app.locals.account.address = app.locals.updatedAddress
  response.status(203).json(app.locals.account);
});
// Response for PUT (returning updated account)

var request = require('request');
var options = {
  'method': 'PUT',
  'url': 'https://v3.recurly.com/accounts/code-1612',
  'headers': {
    'Accept': 'application/vnd.recurly.v2021-02-25',
    'Content-Type': 'application/json',
    'Authorization': 'Basic OTBhZmRjYTkxMWZmNDJlNzlkN2ExMzRkY2YzOTRjMTc6'
  },
  body: JSON.stringify(app.locals.updatedAddress)

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  app.locals.account.address = JSON.parse(response.body)
});
// Request for PUT
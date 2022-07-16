const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors())
app.use(express.json());
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Recurly Assignment';

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.account = []
app.locals.updatedAddress = []

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

app.get('/api/v1/account', (request, response) => {
    const account = app.locals.account;
    response.json({ account });
  });


  app.put('/api/v1/account', (request, response) => {
    console.log('request.body', request.body)
    app.locals.updatedAddress = response.body
  
    response.status(201).json('success');
  });

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
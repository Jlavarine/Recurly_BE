const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors())
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
//   console.log("response Body", response.body);
  app.locals.account = JSON.parse(response.body)
//   console.log("app.locals.account", app.locals.account)
//   console.log("app.locals.account", typeof app.locals.account)

});

app.get('/api/v1/account', (request, response) => {
    const account = app.locals.account;
    response.json({ account });
  });


  app.put('/api/v1/account', (request, response) => {
    app.locals.updatedAddress = response.body
  
    response.status(201).json(console.log(app.locals.updatedAddress));
  });

//   app.put('/api/v1/account', (request, response) => {
//     const updatedAddress = request.body;
  
//     for (let requiredParameter of ['phone', 'street1', 'street2', 'city', 'region', 'postal_code', 'country']) {
//       if (!updatedAddress[requiredParameter]) {
//         response
//           .status(422)
//           .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
//       }
//     }
  
//     const { phone, street1, street2, city, region, postal_code, country } = updatedAddress;
//     app.locals.account.address = updatedAddress
//     response.status(201).json({ updatedAddress});
//   });



// var request = require('request');
// var options = {
//   'method': 'PUT',
//   'url': 'https://v3.recurly.com/accounts/code-1612',
//   'headers': {
//     'Accept': 'application/vnd.recurly.v2021-02-25',
//     'Content-Type': 'application/json',
//     'Authorization': 'Basic OTBhZmRjYTkxMWZmNDJlNzlkN2ExMzRkY2YzOTRjMTc6'
//   },
//   body: JSON.stringify({
//     "address": {
//       "phone": `${app.locals.account.address}`,
//       "street1": `${app.locals.account.address}`,
//       "street2": `${app.locals.account.address}`,
//       "city": `${app.locals.account.address}`,
//       "region": `${app.locals.account.address}`,
//       "postal_code": `${app.locals.account.address}`,
//       "country": `${app.locals.account.address}`
//     }
//   })

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
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
  console.log(response.body);
});


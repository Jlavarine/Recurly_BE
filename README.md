# Recurly Take Home Assessment

## Technologies
- Express
- Nodejs

## Contributors

- [Jacob Lavarine](https://github.com/Jlavarine)

## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get account |`/api/v1/account`| GET | N/A | Account: {} |
| Update account address |`/api/v1/account`| PUT | `"address": {"phone": "string", "street1": "string", "street2": "string", "city": "string", "region": "string", "postal_code": "string", "country": "string"}` | New order that was added: `{id: 2, name: "Alex", ingredients: ["cheese", "beans"]}` |

## Future Additions
- I would like to add a lot more error handling 

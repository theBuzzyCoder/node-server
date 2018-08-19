# Controllers / API

Contains logic to all the API's that are allowed in this application

## /users

Allows to create, edit, update and delete user information

### CRUD Operations

#### `GET /users?phone={phone}`

Returns the users information

#### `POST /users`

Creates new user if user already doesn't exist. If exists, sends error response

`payload`: ```json
{
  "firstName": "firstName",
  "lastName": "lastName",
  "phone": "10 digit number",
  "tosAgreement": true,
  "password": "secret"
}
```

#### `PUT /users`

Updates user only if exists otherwise sends error response.

`payload`: ```json
{
  "firstName": "newFirstName",
  "phone": "10 digit number"
}
```

#### `DELETE /users?phone={phone}`

Deletes the user if exists, otherwise sends 500 error response.

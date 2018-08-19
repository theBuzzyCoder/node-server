# Controllers / API

Contains logic to all the API's that are allowed in this application

## Users API

Allows to create, edit, update and delete user information

### CRUD Operations

#### Get User

`GET /api/v1/users?phone={phone}`

Returns the users information

#### Create User

`POST /api/v1/users`

Creates new user if user already doesn't exist. If exists, sends error response

**Payload**
```json
{
  "firstName": "firstName",
  "lastName": "lastName",
  "phone": "10 digit number",
  "tosAgreement": true,
  "password": "secret"
}
```

#### Update User

`PUT /api/v1/users`

Updates user only if exists otherwise sends error response.

**Payload**
```json
{
  "firstName": "newFirstName",
  "phone": "10 digit number"
}
```

#### Delete User

`DELETE /api/v1/users?phone={phone}`

Deletes the user if exists, otherwise sends 500 error response.

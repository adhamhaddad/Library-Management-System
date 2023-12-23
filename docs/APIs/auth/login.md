# Routes

## POST /api/v1/auth/login

Login user.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "accept": "application/json"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "username": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the request is success, the server will respond with a status code of 201 and a JSON of user:

```json
{
  "status": 201,
  "message": "Login successfully!",
  "data": {
    "id": "60eba2e3-332c-418b-8d78-ca01cf200eb7",
    "name": "Adham",
    "email": "adhamhaddad.dev@gmail.com",
    "role": "borrower",
    "createdAt": "2023-12-23T16:33:33.528Z",
    "updatedAt": "2023-12-23T16:33:33.528Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#auth)

# Admin Account Credentials

## POST /api/v1/auth/login

Login admin.

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
  "username": "admin@library.com",
  "password": "admin@library!"
}
```

### Response

If the request is success, the server will respond with a status code of 201 and a JSON of user:

```json
{
  "status": 201,
  "message": "Login successfully!",
  "data": {
    "id": "8dc50f2a-3fac-4f3d-8983-dec2ced978be",
    "name": "Library Admin",
    "email": "admin@library.com",
    "role": "admin",
    "createdAt": "2023-12-23T16:33:09.577Z",
    "updatedAt": "2023-12-23T16:33:09.577Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](./README.md#auth)

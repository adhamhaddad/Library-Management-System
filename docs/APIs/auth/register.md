# Routes

## POST /api/v1/auth/register

Create user.

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
  "name": "Adham Haddad",
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the request is success, the server will respond with a status code of 201 and a JSON of user:

```json
{
  "status": 201,
  "message": "Request successful",
  "data": {
    "id": "ad70423f-ab2c-48fd-b6ac-d9a8e3f06d22",
    "name": "Adham Haddad",
    "email": "adhamhaddad.dev@gmail.com",
    "role": "borrower",
    "createdAt": "2023-12-23T19:59:27.791Z",
    "updatedAt": "2023-12-23T19:59:27.791Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#auth)

# Routes

## PATCH /api/v1/borrowers

Update Borrower.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Body

The request body should be a JSON object with any of the following properties:

```json
{
  "name": "Adham Ashraf"
  // "email": "adhamhaddad@gmail.com"
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of borrower:

```json
{
  "status": 200,
  "message": "Borrower updated successfully",
  "data": {
    "id": "60eba2e3-332c-418b-8d78-ca01cf200eb7",
    "name": "Adham Ashraf",
    "email": "adhamhaddad.dev@gmail.com",
    "role": "borrower",
    "createdAt": "2023-12-23T16:33:33.528Z",
    "updatedAt": "2023-12-23T20:54:02.134Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#books)

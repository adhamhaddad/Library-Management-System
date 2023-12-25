# Routes

## DELETE /api/v1/admin/borrowers/`:id`

List Borrowers.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Params

1. `id` Borrower ID - (`required`)

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of borrower:

```json
{
  "status": 200,
  "message": "Borrower deleted successfully",
  "data": {
    "id": "ad70423f-ab2c-48fd-b6ac-d9a8e3f06d22",
    "name": "Mohamed Khaled",
    "email": "simba@gmail.com",
    "role": "borrower",
    "createdAt": "2023-12-23T19:59:27.791Z",
    "updatedAt": "2023-12-23T19:59:27.791Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#books)

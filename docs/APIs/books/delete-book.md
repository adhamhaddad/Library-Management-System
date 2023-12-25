# Routes

## DELETE /api/v1/admin/books/`:id`

List Books.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Params

1. `id` Book ID - (`required`)

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of books:

```json
{
  "status": 200,
  "message": "Book deleted successfully",
  "data": {
    "id": "c81b2d31-50bf-4d9d-9a2c-0c444f7cecba",
    "title": "JavaScript",
    "author": "Adham Ashraf",
    "isbn": "978-1-234567-01-2",
    "quantity": 15,
    "availableQuantity": 15,
    "shelfLocation": "Fiction A-C",
    "createdAt": "2023-12-23T16:35:13.945Z",
    "updatedAt": "2023-12-23T16:35:13.945Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#books)

# Routes

## POST /api/v1/borrowings/`:id`/checkout

Checkout book.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "dueDate": "2024-01-01"
}
```

### Response

If the request is success, the server will respond with a status code of 201 and a JSON of checked out book:

```json
{
  "status": 201,
  "message": "Book checked out successfully",
  "data": {
    "id": "6cc776c3-9cee-44e2-85ef-fde4179a7eaf",
    "book": {
      "id": "e34e0cb9-661f-4583-b84e-697814a09632",
      "title": "TypeScript",
      "author": "Adham Ashraf",
      "isbn": "978-1-234567-01-4",
      "quantity": 15,
      "availableQuantity": 14,
      "shelfLocation": "Fiction A-C",
      "createdAt": "2023-12-23T16:35:28.715Z",
      "updatedAt": "2023-12-23T21:02:59.456Z"
    },
    "checkOutDate": "2023-12-23T21:02:59.477Z",
    "dueDate": "2024-01-01T00:00:00.000Z",
    "returnDate": null,
    "createdAt": "2023-12-23T21:02:59.481Z",
    "updatedAt": "2023-12-23T21:02:59.481Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#borrowings)

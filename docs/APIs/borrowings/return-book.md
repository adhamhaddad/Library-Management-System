# Routes

## POST /api/v1/borrowings/`:id`/return

Return Book.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Params

1. `id` Borrowing Record ID - (`required`)

### Response

If the request is success, the server will respond with a status code of 201 and a JSON of book return:

```json
{
  "status": 201,
  "message": "Book return successfully",
  "data": {
    "id": "6cc776c3-9cee-44e2-85ef-fde4179a7eaf",
    "book": {
      "id": "e34e0cb9-661f-4583-b84e-697814a09632",
      "title": "TypeScript",
      "author": "Adham Ashraf",
      "isbn": "978-1-234567-01-4",
      "quantity": 15,
      "availableQuantity": 15,
      "shelfLocation": "Fiction A-C",
      "createdAt": "2023-12-23T16:35:28.715Z",
      "updatedAt": "2023-12-23T21:02:59.456Z"
    },
    "checkOutDate": "2023-12-23",
    "dueDate": "2024-01-01",
    "returnDate": "2023-12-23T21:10:15.122Z",
    "createdAt": "2023-12-23T21:02:59.481Z",
    "updatedAt": "2023-12-23T21:10:15.131Z"
  },
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#borrowings)

# Routes

## PATCH /api/v1/admin/books/`:id`

Update Book.

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
  "title": "JavaScript",
  "author": "Adham Haddad",
  "isbn": "978-1-234567-01-8",
  "shelfLocation": "Fiction A-C",
  "quantity": 15
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of book:

```json
{
  "status": 200,
  "message": "Book updated successfully",
  "data": [
    {
      "id": "c0f8de4f-edf7-4044-9c12-baa8bcef76ac",
      "title": "JavaScript",
      "author": "Adham Haddad",
      "isbn": "978-1-234567-01-8",
      "quantity": 15,
      "availableQuantity": 15,
      "shelfLocation": "Fiction A-C",
      "createdAt": "2023-12-23T20:14:59.758Z",
      "updatedAt": "2023-12-23T20:20:35.543Z"
    }
  ],
  "total": 0,
  "meta": {}
}
```

### [Back to README](../../README.md#books)

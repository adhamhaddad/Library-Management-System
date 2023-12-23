# Routes

## GET /api/v1/borrowings

List the books they currently have.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON of checked out books:

```json
{
  "status": 200,
  "data": [
    {
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
      "checkOutDate": "2023-12-23",
      "dueDate": "2024-01-01",
      "returnDate": null,
      "createdAt": "2023-12-23T21:02:59.481Z",
      "updatedAt": "2023-12-23T21:02:59.481Z"
    },
    {
      "id": "daf4e1fd-ea6e-45fa-be9b-6aa9b2581b18",
      "book": {
        "id": "62849c02-5ac8-49f9-a148-4302511dda0d",
        "title": "Python",
        "author": "Adham Haddad",
        "isbn": "978-1-234567-01-5",
        "quantity": 15,
        "availableQuantity": 14,
        "shelfLocation": "Fiction A-C",
        "createdAt": "2023-12-23T16:35:40.940Z",
        "updatedAt": "2023-12-23T16:41:00.949Z"
      },
      "checkOutDate": "2023-12-23",
      "dueDate": "2023-01-12",
      "returnDate": null,
      "createdAt": "2023-12-23T16:41:00.960Z",
      "updatedAt": "2023-12-23T16:41:00.960Z"
    }
  ],
  "total": 2,
  "meta": {
    "total": 2,
    "currentPage": 1,
    "eachPage": 15,
    "lastPage": 1
  }
}
```

### [Back to README](../../README.md#borrowings)

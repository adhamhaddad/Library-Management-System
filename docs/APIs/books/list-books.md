# Routes

## GET /api/v1/books

List Books.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON array of books:

```json
{
  "status": 200,
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
    },
    {
      "id": "bb30985b-b881-4872-8f16-38143056261d",
      "title": "C#",
      "author": "Mohamed Khaled",
      "isbn": "978-1-234567-01-6",
      "quantity": 15,
      "availableQuantity": 14,
      "shelfLocation": "Fiction A-C",
      "createdAt": "2023-12-23T16:36:01.387Z",
      "updatedAt": "2023-12-23T19:17:09.683Z"
    },
    {
      "id": "62849c02-5ac8-49f9-a148-4302511dda0d",
      "title": "Python",
      "author": "Mohamed Mahmoud",
      "isbn": "978-1-234567-01-5",
      "quantity": 15,
      "availableQuantity": 14,
      "shelfLocation": "Fiction A-C",
      "createdAt": "2023-12-23T16:35:40.940Z",
      "updatedAt": "2023-12-23T16:41:00.949Z"
    }
  ],
  "total": 3,
  "meta": {
    "total": 3,
    "currentPage": 1,
    "eachPage": 15,
    "lastPage": 1
  }
}
```

### [Back to README](../../README.md#books)

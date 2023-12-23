# Routes

## GET /api/v1/admin/borrowings/over-due

List borrowings.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Response

If the request is success, the server will respond with a status code of 200 and a JSON array of borrowings:

```json
{
  "status": 200,
  "data": [
    {
      "id": "daf4e1fd-ea6e-45fa-be9b-6aa9b2581b18",
      "borrower": {
        "id": "60eba2e3-332c-418b-8d78-ca01cf200eb7",
        "name": "Adham Ashraf",
        "email": "adhamhaddad.dev@gmail.com",
        "role": "borrower",
        "createdAt": "2023-12-23T16:33:33.528Z",
        "updatedAt": "2023-12-23T20:54:02.134Z"
      },
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
  "total": 1,
  "meta": {
    "total": 1,
    "currentPage": 1,
    "eachPage": 15,
    "lastPage": 1
  }
}
```

### [Back to README](../../README.md#borrowings)

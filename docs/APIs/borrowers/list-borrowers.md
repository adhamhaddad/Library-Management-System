# Routes

## GET /api/v1/admin/borrowers

List Borrowers.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Content-Type": "application/json",
    "Cookie": "access_token=<accessToken>"
}
```

### Request Query Params

1. `sort`=string - (`optional`)
2. `filter[keyword]`=string - (`optional`)
3. `page`=number - (`optional`)

### Filter Example

`http://localhost:3000/api/v1/books?filter[keyword]=Adham` - Borrower name
`http://localhost:3000/api/v1/books?filter[keyword]=adhamhaddad.dev@gmail.com` - Borrower email

### Sort Example

`name, email`

`http://localhost:3000/api/v1/books?sort=-name`- Borrower name desc

`http://localhost:3000/api/v1/books?sort=name` - Borrower name asc

### Response

If the request is success, the server will respond with a status code of 200 and a JSON array of borrowers:

```json
{
  "status": 200,
  "data": [
    {
      "id": "ad70423f-ab2c-48fd-b6ac-d9a8e3f06d22",
      "name": "Mohamed Khaled",
      "email": "simba@gmail.com",
      "role": "borrower",
      "createdAt": "2023-12-23T19:59:27.791Z",
      "updatedAt": "2023-12-23T19:59:27.791Z"
    },
    {
      "id": "771cd50d-196e-4314-b688-ba2346abd3ef",
      "name": "Adham Haddad",
      "email": "adhamhaddad@gmail.com",
      "role": "borrower",
      "createdAt": "2023-12-23T19:10:37.596Z",
      "updatedAt": "2023-12-23T19:10:37.596Z"
    },
    {
      "id": "60eba2e3-332c-418b-8d78-ca01cf200eb7",
      "name": "Mohamed Mahmoud",
      "email": "mohamedmahmoud@gmail.com",
      "role": "borrower",
      "createdAt": "2023-12-23T16:33:33.528Z",
      "updatedAt": "2023-12-23T16:33:33.528Z"
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

# Library-Management-System-API

Note:
All APIs supports (en, ar) filter

## Request Query Params

`lang`=string - (`optional`)

## Example

`http://localhost:3000/api/v1/books?lang=en`

## APIs

- [Library-Management-System-API](#library-management-system-api)
  - [Request Query Params](#request-query-params)
  - [Example](#example)
  - [APIs](#apis)
  - [Auth](#auth)
  - [Books](#books)
  - [Borrowers](#borrowers)
  - [Borrowing](#borrowing)
  - [View project Infrastructure Diagrams](#view-project-infrastructure-diagrams)

## Auth

- Register User - View the [API](./APIs/auth/register.md) documentation

- Login User - View the [API](./APIs/auth/login.md) documentation

- Logout User - View the [API](./APIs/auth/logout.md) documentation

## Books

- (`admin`) Create Book - View the [API](./APIs/books/create-book.md) documentation

- (`admin`) Update Book - View the [API](./APIs/books/create-book.md) documentation

- (`admin`) Delete Book - View the [API](./APIs/books/create-book.md) documentation

- (`both`) List Book - View the [API](./APIs/books/list-books.md) documentation

## Borrowers

- (`admin`) List Borrowers - View the [API](./APIs/borrowers/list-borrowers.md) documentation

- (`borrower`) Update Borrower - View the [API](./APIs/borrowers/update-borrower.md) documentation

- (`admin`) Delete Borrower - View the [API](./APIs/borrowers/delete-borrower.md) documentation

## Borrowing

- (`borrower`) Checkout book - View the [API](./APIs/borrowings/checkout-book.md) documentation

- (`borrower`) Return Book - View the [API](./APIs/borrowings/create-posts.md) documentation

- (`borrower`) List the books they currently have - View the [API](./APIs/borrowings/list-my-checked-out-books.md) documentation

- (`admin`) List Borrowings Checked out - View the [API](./APIs/borrowings/list-checked-out.books) documentation

- (`admin`) List Borrowings Overdue date - View the [API](./APIs/borrowings/list-borrowings.md) documentation

## View project [Infrastructure Diagrams](./Infrastructure.md)

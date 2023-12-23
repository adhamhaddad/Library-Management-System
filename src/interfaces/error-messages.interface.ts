export interface ErrorMessages {
  /* -- Auth -- */
  userNotFound: string;
  emailTaken: string;
  loginSuccessfully: string;
  invalidUsernameOrPassword: string;
  passwordMismatch: string;
  requestSuccessful: string;
  requestFailed: string;
  /* -- Borrowers -- */
  borrowerUpdatedSuccessfully: string;
  borrowerDeletedSuccessfully: string;
  failedToUpdateBorrower: string;
  failedToDeleteBorrower: string;
  /* -- Books -- */
  bookNotFound: string;
  bookCreatedSuccessfully: string;
  bookUpdatedSuccessfully: string;
  bookDeletedSuccessfully: string;
  failedToCreateBook: string;
  failedToUpdateBook: string;
  failedToDeleteBook: string;
  /* -- Borrowings -- */
  noEnoughQuantity: string;
  bookCheckedSuccessfully: string;
  bookReturnSuccessfully: string;
  failedToReturnBook: string;
  bookAlreadyReturn: string;
  bookAlreadyChecked: string;
  invalidDueDate: string;
}

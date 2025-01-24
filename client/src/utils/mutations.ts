import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      username
    }
    token
  }
}
`;

export const CREATE_USER = gql `
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      password
    }
    token
  }
}
`;

export const DELETE_BOOK = gql `
mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    title
    link
    image
    description
    bookId
    authors
    _id
  }
}
`;

export const ADD_BOOK = gql `
mutation SaveBook($input: AddBook!) {
  saveBook(input: $input) {
    title
    link
    image
    description
    bookId
    authors
    _id
  }
}
`;
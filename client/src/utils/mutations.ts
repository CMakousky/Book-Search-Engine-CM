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
    image
    description
    bookId
    authors
  }
}
`;

export const ADD_BOOK = gql `
mutation SaveBook($authors: [String], $image: String, $title: String!, $bookId: String!, $description: String!) {
  saveBook(authors: $authors, image: $image, title: $title, bookId: $bookId, description: $description) {
    authors
    bookId
    description
    image
    title
  }
}
`;
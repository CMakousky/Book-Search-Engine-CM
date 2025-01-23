import { gql } from '@apollo/client';

export const GET_SINGLE_USER = gql `
query GetSingleUser($id: String!, $username: String) {
  getSingleUser(_id: $id, username: $username) {
    username
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
      _id
    }
    email
    bookCount
  }
}
`;
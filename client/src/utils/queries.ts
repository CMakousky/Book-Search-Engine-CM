import { gql } from '@apollo/client';

export const GET_ME = gql `
query GetMe($id: String, $username: String) {
  getSingleUser(_id: $id, username: $username) {
    username
    email
    savedBooks {
      title
      image
      description
      bookId
      authors
    }
  }
}
`;
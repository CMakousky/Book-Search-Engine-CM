const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }
    
    input NewUser {
        username: String!
        email: String!
        password: String!
    }

    input AddBook {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        getSingleUser(_id: String!, username: String): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(input: NewUser!): Auth
        saveBook(input: AddBook!): Book
        deleteBook(bookId: ID!): Book
    }
`;

export default typeDefs;
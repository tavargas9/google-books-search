const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    input AddBookInput {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(input: AddBookInput!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
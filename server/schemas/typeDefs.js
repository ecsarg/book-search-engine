const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        title: String
        author: String
        description: String
        image: String
        link: String
    }
    type Auth {
        toke: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(input: savedBooks!): User
        removeBook(_id: ID!): User
    }`;

    module.exports = typeDefs;
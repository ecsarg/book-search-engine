import { gql } from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($input: savedBook!) {
        addBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBook {
                # _id
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBook {
                # _id
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;
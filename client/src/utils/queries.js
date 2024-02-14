import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    query getUser($username: String!) {
        user(username: $username) {
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`;

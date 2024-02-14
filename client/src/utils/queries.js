import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    {
        me {
            email
            password
            _id
            username
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
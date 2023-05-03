import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      slug
      content
      imgUrl
      Category {
        name
      }
      Tags {
        name
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($postId: ID) {
    post(id: $postId) {
      id
      title
      content
      imgUrl
      Category {
        name
      }
      Author {
        username
      }
      Tags {
        name
      }
      createdAt
    }
  }
`;

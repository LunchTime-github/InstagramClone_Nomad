import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: String
    hashtags: [Hashtag]
    totalLike: Int!
    totalComment: Int!
    comments: [Comment]
    isMine: Boolean!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;

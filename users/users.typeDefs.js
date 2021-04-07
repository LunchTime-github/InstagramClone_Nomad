import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    photos: [Photo]
    likes: [Like]
    followers: [User]
    following: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

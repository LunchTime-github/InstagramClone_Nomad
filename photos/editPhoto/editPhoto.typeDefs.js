import { gql } from "apollo-server-core";

export default gql`
  type editPhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editPhoto(id: Int!, caption: String): editPhotoResult!
  }
`;

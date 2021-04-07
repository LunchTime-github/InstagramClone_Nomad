import client from "../../client";

export default {
  Query: {
    seePhotoComments: async (_, { id }) =>
      client.comment.findMany({
        where: { photoId: id },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};

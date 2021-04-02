import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      // find followers
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 4,
          skip: Math.max(0, page - 1) * 4, // skip 은 반드시 양수여야만 함
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};

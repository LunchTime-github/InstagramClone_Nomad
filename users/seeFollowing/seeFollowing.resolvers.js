import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      // check following
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      // find following
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};

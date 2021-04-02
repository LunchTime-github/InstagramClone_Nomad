import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      // check followers
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      console.log(ok);
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      // find followers
      const take = 2;
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take,
          skip: Math.max(0, page - 1) * take, // skip 은 반드시 양수여야만 함
        });

      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / take),
      };
    },
  },
};

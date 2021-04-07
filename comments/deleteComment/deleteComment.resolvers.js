import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!comment) {
        return {
          ok: false,
          error: "Comment not fount",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not Authorized",
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};

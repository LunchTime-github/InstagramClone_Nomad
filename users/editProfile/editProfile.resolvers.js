import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword, token }
    ) => {
      // decord token
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      // hash password
      const uglyPassword = newPassword && (await bcrypt.hash(newPassword, 10));
      const updateUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });

      return updateUser.id
        ? {
            ok: true,
          }
        : {
            ok: false,
            error: "Could not update profile",
          };
    },
  },
};

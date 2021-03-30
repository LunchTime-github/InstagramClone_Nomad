import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user with atgs.username
      const user = await client.user.findFirst({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // check password width args.password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      // issue a token and send it to the user
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

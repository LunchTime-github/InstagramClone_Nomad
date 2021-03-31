import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser }
) => {
  // hash password
  const uglyPassword = newPassword && (await bcrypt.hash(newPassword, 10));
  const updateUser = await client.user.update({
    where: {
      id: loggedInUser.id,
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
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id },
        select: {
          userId: true,
          hashtags: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!photo) {
        return {
          ok: false,
          error: "Photo not found",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
      } else {
        /// hashtag 삭제
        // hash id 찾기
        const hashtagIds = photo.hashtags.map((hash) => ({ id: hash.id }));
        // photo hashtags and like disconnect update
        await client.photo.update({
          where: { id },
          data: {
            hashtags: {
              disconnect: hashtagIds,
            },
          },
        });
        // photo 에 연결되지 않은 hashtag 찾기
        const noHashtags = hashtagIds.filter(async (hashtagId) => {
          const hashtag = await client.hashtag.findFirst({
            where: { id: hashtagId.id },
            select: { photos: { select: { id: true } } },
          });
          return hashtag.photos.length === 0;
        });
        // 찾은 hashtag 삭제
        await client.hashtag.deleteMany({ where: { OR: noHashtags } });

        /// like 삭제
        // like id 찾기
        const likeIds = photo.likes.map((like) => ({ id: like.id }));
        // 찾은 like 삭제
        await client.like.deleteMany({ where: { OR: likeIds } });

        // photo 삭제
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    }),
  },
};

import { Post, PostProps } from "@src/post/domain/entities/Post.entity";

type Override = Partial<PostProps>;

export function MakePost(override: Override = {}) {
  return new Post({
    id: 1,
    content: "new content",
    images: ["image1.jpg"],
    authorId: 1,
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  });
}

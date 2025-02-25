import { Comment, CommentProps } from "../../src/comment/domain/entities/Comment.entity";

type Override = Partial<CommentProps>;

export function MakeComment(override: Override = {}) {
  return new Comment({
    id: 1,
    content: "Test comment content",
    authorId: 1,
    postId: 1,
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  });
}

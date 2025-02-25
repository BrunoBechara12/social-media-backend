import { InMemoryCommentRepository } from "@test/repositories/InMemoryComment.repository";
import { MakeComment } from "@test/factories/Comment.factory";
import { CreateReply } from "../CreateReply";

describe('Create Reply', () => {
  let createReply: CreateReply;
  let commentRepository: InMemoryCommentRepository;
  let parentComment;

  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    createReply = new CreateReply(commentRepository);

    parentComment = MakeComment();
    await commentRepository.create(parentComment);
  });

  it('Should be able to create a reply to a comment', async () => {
    const replyDto = {
      content: "This is a reply",
      authorId: 1,
      postId: parentComment.postId,
      commentId: parentComment.id
    };

    await createReply.execute(replyDto);

    expect(commentRepository.comments).toHaveLength(2);
    expect(commentRepository.comments[1].commentId).toBe(parentComment.id);
    expect(commentRepository.comments[1].content).toBe(replyDto.content);
  });
});
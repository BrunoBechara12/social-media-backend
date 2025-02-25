import { InMemoryCommentRepository } from "../../../../test/repositories/InMemoryComment.repository";
import { MakeComment } from "../../../../test/factories/Comment.factory";
import { Delete } from "../Delete";

describe('Delete comment', () => {
  let deleteComment: Delete;
  let commentRepository: InMemoryCommentRepository;
  let comment;

  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    deleteComment = new Delete(commentRepository);

    comment = MakeComment();
    await commentRepository.create(comment);
  });

  it('Should be able to create a reply to a comment', async () => {
    await deleteComment.execute(comment.id);

    expect(commentRepository.comments).toHaveLength(0);
  });
});
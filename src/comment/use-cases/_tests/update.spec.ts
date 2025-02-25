import { InMemoryCommentRepository } from "../../../../test/repositories/InMemoryComment.repository";
import { Update } from "../Update";
import { MakeComment } from "../../../../test/factories/Comment.factory";
import { UpdateCommentDto } from "src/comment/infra/dtos/UpdateComment.dto";

describe('Update comment', () => {
  let updateComment: Update;
  let commentRepository: InMemoryCommentRepository;
  let comment;

  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    updateComment = new Update(commentRepository);

    comment = MakeComment();
  });

  it('Should be able to update a post', async () => {
    commentRepository.comments.push(comment);

    const updateCommentDto: UpdateCommentDto = {
      content: 'Updated content',
      commentId: comment.id,
      updatedAt: new Date()
    };

    await updateComment.execute(updateCommentDto);

    expect(commentRepository.comments[0]).toBeTruthy();
    expect(commentRepository.comments[0].content).toBe(updateCommentDto.content);
  });

  it('Should update updatedAt', async () => {
    commentRepository.comments.push(comment);

    const beforeUpdate = new Date();

    const updateCommentDto: UpdateCommentDto = {
      commentId: comment.id, 
      content: 'Only updating content',
      updatedAt: new Date()
    };

    const afterUpdate = updateCommentDto.updatedAt;

    await updateComment.execute(updateCommentDto);

    expect(commentRepository.comments[0].content).toBe(updateCommentDto.content);
    expect(commentRepository.comments[0].updatedAt).toBeInstanceOf(Date);
    expect(commentRepository.comments[0].updatedAt?.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    expect(commentRepository.comments[0].updatedAt?.getTime()).toBeLessThanOrEqual(afterUpdate.getTime());
  });
});

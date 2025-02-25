import { MakeComment } from "../../../../test/factories/Comment.factory";
import { InMemoryCommentRepository } from "../../../../test/repositories/InMemoryComment.repository";
import { Create } from "../Create";


describe('Create Comment', () => {
  let createComment: Create;
  let commentRepository: InMemoryCommentRepository;

  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    createComment = new Create(commentRepository);
  });

  it('Should be able to create a comment', async () => {
    const commentDto = MakeComment();

    await createComment.execute(commentDto);

    expect(commentRepository.comments).toHaveLength(1);
    expect(commentRepository.comments[0].authorId).toBe(commentDto.authorId);
    expect(commentRepository.comments[0].postId).toBe(commentDto.id);
  });

});

import { InMemoryCommentRepository } from "@test/repositories/InMemoryComment.repository";
import { MakeComment } from "@test/factories/Comment.factory";
import { GetAllByPost } from "../GetAllByPost";

describe('Get all comments by post', () => {
  let getByPost: GetAllByPost;
  let commentRepository: InMemoryCommentRepository;

  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
    getByPost = new GetAllByPost(commentRepository);
  });

  it('Should be able to get all comments from a post', async () => {
    const postId = 1;
    const comment1 = MakeComment({ postId });
    const comment2 = MakeComment({ postId });
    const comment3 = MakeComment({ postId: 2 }); 

    await commentRepository.create(comment1);
    await commentRepository.create(comment2);
    await commentRepository.create(comment3);

    const comments = await getByPost.execute(postId);

    expect(comments).toHaveLength(2);
    expect(comments).toEqual(expect.arrayContaining([
      expect.objectContaining({ postId: postId }),
      expect.objectContaining({ postId: postId })
    ]));
  });

  it('Should return empty array when post has no comments', async () => {
    const comments = await getByPost.execute(999);
    expect(comments).toHaveLength(0);
  });
});
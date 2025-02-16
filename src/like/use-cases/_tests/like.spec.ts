import { Like } from '../Like';
import { InMemoryLikeRepository } from '../../../../test/repositories/InMemoryLike.repository';
import { MakePost } from '../../../../test/factories/Post.factory';
import { ToggleLikeDto } from 'src/like/infra/dtos/ToggleLike.dto';

describe('Like post', () => {
  it('should like a post successfully', async () => {
    const likeRepository = new InMemoryLikeRepository();
    const like = new Like(likeRepository);

    const post = MakePost();

    const toggleLikeDto: ToggleLikeDto = {
      postId: post.id,
      userId: post.authorId
    };

    await like.execute(toggleLikeDto);

    const totalLikes = await likeRepository.getAllByPost(post.id);
    expect(totalLikes).toBe(1);
  });
});

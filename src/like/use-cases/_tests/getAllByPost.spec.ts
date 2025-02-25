import { Like } from '../Like';
import { InMemoryLikeRepository } from '@test/repositories/InMemoryLike.repository';
import { MakePost } from '@test/factories/Post.factory';
import { ToggleLikeDto } from 'src/like/infra/dtos/ToggleLike.dto';
import { GetAllByPost } from '../GetAllByPost';

describe('Unlike post', () => {
  it('should unlike a post successfully', async () => {
    const likeRepository = new InMemoryLikeRepository();
    const getAllByPost = new GetAllByPost(likeRepository);
    const like = new Like(likeRepository);

    const post = MakePost();

    const toggleLikeDto: ToggleLikeDto = {
      postId: post.id,
      userId: post.authorId
    };

    await like.execute(toggleLikeDto);
    
    const totalLikes = await getAllByPost.execute(post.id);
    
    expect(totalLikes).toBe(1);
  });
});

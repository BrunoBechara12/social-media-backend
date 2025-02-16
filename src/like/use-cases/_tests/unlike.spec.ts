import { Like } from '../Like';
import { InMemoryLikeRepository } from '../../../../test/repositories/InMemoryLike.repository';
import { MakePost } from '../../../../test/factories/Post.factory';
import { ToggleLikeDto } from 'src/like/infra/dtos/ToggleLike.dto';
import { Unlike } from '../Unlike';

describe('Unlike post', () => {
  it('should unlike a post successfully', async () => {
    const likeRepository = new InMemoryLikeRepository();
    const unlike = new Unlike(likeRepository);
    const like = new Like(likeRepository);

    const post = MakePost();

    const toggleLikeDto: ToggleLikeDto = {
      postId: post.id,
      userId: post.authorId
    };

    await like.execute(toggleLikeDto);
    
    let totalLikes = await likeRepository.getAllByPost(post.id);
    console.log("curtido" + totalLikes)
    expect(totalLikes).toBe(1);

    await unlike.execute(toggleLikeDto);

    totalLikes = await likeRepository.getAllByPost(post.id);
    console.log("descurtido" + totalLikes)

    expect(totalLikes).toBe(0);
  });
});

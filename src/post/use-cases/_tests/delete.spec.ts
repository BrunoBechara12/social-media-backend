
import { Delete } from "../Delete";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { MakePost } from "@test/factories/Post.factory";
import { InMemoryPostRepository } from "@test/repositories/InMemoryPost.repository";

describe('Delete post', () => {
  it('Should be able to delete a post', async () => {
    const postRepository = new InMemoryPostRepository();
    const deletePost = new Delete(postRepository);

    const post = MakePost();

    postRepository.posts.push(PostMapper.toPrisma(post));

    await deletePost.execute(post.id);

    expect(postRepository.posts).toHaveLength(0);
  });
});


import { GetAll } from "../GetAll";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { InMemoryPostRepository } from "@test/repositories/InMemoryPost.repository";
import { MakePost } from "@test/factories/Post.factory";

describe('Get all posts', () => {
  it('Should be able to get all posts', async () => {
    const postRepository = new InMemoryPostRepository();
    const getAll = new GetAll(postRepository);

    const post = MakePost();
    const post2 = MakePost();

    postRepository.posts.push(PostMapper.toPrisma(post));
    postRepository.posts.push(PostMapper.toPrisma(post2));

    const foundPosts = await getAll.execute();

    expect(foundPosts).toHaveLength(2);
  });
});

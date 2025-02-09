
import { GetAllByAuthor } from "../GetAllByAuthor";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { InMemoryPostRepository } from "../../../../test/repositories/InMemoryPost.repository";
import { MakePost } from "../../../../test/factories/Post.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Get all posts by author', () => {
  it('Should be able to get all posts by author', async () => {
    const postRepository = new InMemoryPostRepository();
    const getAllByAuthor = new GetAllByAuthor(postRepository);

    const post = MakePost();

    postRepository.posts.push(PostMapper.toPrisma(post));
    postRepository.posts.push(PostMapper.toPrisma(post));

    const foundPosts = await getAllByAuthor.execute(post.authorId);

    expect(foundPosts).toHaveLength(2);
  });

  it('Should not be able to get posts by author that has no posts', async () => {
    const postRepository = new InMemoryPostRepository();
    const getAllByAuthor = new GetAllByAuthor(postRepository);

    const posts = getAllByAuthor.execute(2)

    expect(posts).toThrow(new HttpException("O usuário ainda não fez nenhum post", HttpStatus.NOT_FOUND));
  });
});

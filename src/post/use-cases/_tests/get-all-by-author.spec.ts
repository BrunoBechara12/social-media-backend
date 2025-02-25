import { GetAllByAuthor } from "../GetAllByAuthor";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { InMemoryPostRepository } from "@test/repositories/InMemoryPost.repository";
import { MakePost } from "@test/factories/Post.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Get all posts by author', () => {
  let getAllByAuthor: GetAllByAuthor;
  let postRepository: InMemoryPostRepository;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    getAllByAuthor = new GetAllByAuthor(postRepository);
  });

  it('Should be able to get all posts by author', async () => {
    const post = MakePost();
    postRepository.posts.push(PostMapper.toPrisma(post));
    postRepository.posts.push(PostMapper.toPrisma(post));

    const foundPosts = await getAllByAuthor.execute(post.authorId);

    expect(foundPosts).toHaveLength(2);
    expect(foundPosts[0].authorId).toBe(post.authorId);
    expect(foundPosts[1].authorId).toBe(post.authorId);
  });

  it('Should throw an error if author has no posts', async () => {
    await expect(getAllByAuthor.execute(999)).rejects.toThrow(
      new HttpException("O usuario ainda não realizou nenhum post", HttpStatus.NOT_FOUND)
    );
  });
});

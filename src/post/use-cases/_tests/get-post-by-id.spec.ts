import { GetById } from "../GetById";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { InMemoryPostRepository } from "../../../../test/repositories/InMemoryPost.repository";
import { MakePost } from "../../../../test/factories/Post.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Get post by id', () => {
  let getById: GetById;
  let postRepository: InMemoryPostRepository;
  let post: any;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    getById = new GetById(postRepository);
    post = MakePost();
    postRepository.posts.push(PostMapper.toPrisma(post));
  });

  it('Should be able to get a post by id', async () => {
    const foundPost = await getById.execute(post.id);

    expect(foundPost).toBeTruthy();
    expect(foundPost.id).toBe(post.id);
    expect(foundPost.content).toBe(post.content);
    expect(foundPost.authorId).toBe(post.authorId);
  });

  it('Should not be able to get a post by id that does not exist', async () => {
    await expect(getById.execute(999)).rejects.toThrow(
      new HttpException("O usuário ainda não fez nenhum post", HttpStatus.NOT_FOUND)
    );
  });
});


import { GetById } from "../GetById";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { InMemoryPostRepository } from "../../../../test/repositories/InMemoryPost.repository";
import { MakePost } from "../../../../test/factories/Post.factory";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Get post by id', () => {
  it('Should be able to get a post by id', async () => {
    const postRepository = new InMemoryPostRepository();
    const getById = new GetById(postRepository);

    const post = MakePost();

    postRepository.posts.push(PostMapper.toPrisma(post));

    const foundPost = await getById.execute(post.id);

    expect(foundPost).toBeTruthy();
  });

  it('Should not be able to get a post by id that does not exist', async () => {
    const postRepository = new InMemoryPostRepository();
    const getById = new GetById(postRepository);

    const post = MakePost();

    postRepository.posts.push(PostMapper.toPrisma(post));

    const getPost = getById.execute(2);

    expect(getPost).toThrow(new HttpException("Post não encontrado para o id informado", HttpStatus.NOT_FOUND));
  });
});

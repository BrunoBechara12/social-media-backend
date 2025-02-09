import { Update } from "../Update";
import { PostMapper } from "../../domain/mappers/Post.mapper";
import { MakePost } from "../../../../test/factories/Post.factory";
import { InMemoryPostRepository } from "../../../../test/repositories/InMemoryPost.repository";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdatePostDto } from "../../../../src/post/infra/dtos/UpdatePost.dto";

describe('Update post', () => {
  let updatePost: Update;
  let postRepository: InMemoryPostRepository;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    updatePost = new Update(postRepository);
  });

  it('Should be able to update a post', async () => {
    const post = MakePost();
    postRepository.posts.push(PostMapper.toPrisma(post));

    const updatePostDto: UpdatePostDto = {
      id: post.id,
      content: 'Updated content',
      images: [],
      updatedAt: new Date()
    };

    await updatePost.execute(updatePostDto);

    const updatedPost = postRepository.posts.find(p => p.id === post.id);

    expect(updatedPost).toBeTruthy();
    expect(updatedPost?.content).toBe(updatePostDto.content);
  });

  it('Should not be able to update a post that does not exist', async () => {
    const updatePostDto: UpdatePostDto = {
      id: 999,
      content: 'Updated content',
      images: [],
      updatedAt: new Date()
    };

    await expect(updatePost.execute(updatePostDto)).rejects.toThrow(
      new HttpException("O usuário ainda não fez nenhum post", HttpStatus.NOT_FOUND)
    );
  });

  it('Should maintain existing field values when they are not included in the update', async () => {
    const post = MakePost();
    const originalContent = post.content;

    postRepository.posts.push(PostMapper.toPrisma(post));

    const updatePostDto: UpdatePostDto = {
      id: post.id,
      content: '',
      images: ['new-image-url.jpg'],
      updatedAt: new Date()
    };

    await updatePost.execute(updatePostDto);

    const updatedPost = postRepository.posts.find(p => p.id === post.id);

    expect(updatedPost).toBeTruthy();
    expect(updatedPost?.images).toContain('new-image-url.jpg');
    expect(updatedPost?.content).toBe(originalContent);
  });

  it('Should update updatedAt', async () => {
    const post = MakePost();
    postRepository.posts.push(PostMapper.toPrisma(post));

    const beforeUpdate = new Date();

    const updatePostDto: UpdatePostDto = {
      id: post.id,
      content: 'Only updating content',
      images: [],
      updatedAt: new Date()
    };

    await updatePost.execute(updatePostDto);

    const updatedPost = postRepository.posts.find(p => p.id === post.id);
    const afterUpdate = new Date();

    expect(updatedPost?.updatedAt).toBeInstanceOf(Date);
    expect(updatedPost?.updatedAt!.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    expect(updatedPost?.updatedAt!.getTime()).toBeLessThanOrEqual(afterUpdate.getTime());
  });
});

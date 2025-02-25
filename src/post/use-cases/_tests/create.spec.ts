import { InMemoryPostRepository } from "@test/repositories/InMemoryPost.repository";
import { Create } from "../Create";
import { MakePost } from "@test/factories/Post.factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUser.repository";
import { MakeUser } from "@test/factories/User.factory";
import { UserMapper } from "../../../user/domain/mappers/User.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('Create post', () => {
  let createPost: Create;
  let postRepository: InMemoryPostRepository;
  let userRepository: InMemoryUserRepository;
  let user: any;

  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();
    createPost = new Create(postRepository, userRepository);
    postRepository.users = userRepository.users;
    
    user = MakeUser();
    userRepository.users.push(UserMapper.toPrisma(user));
  });

  it('Should be able to create a post', async () => {
    const postDto = MakePost({ authorId: user.id });

    await createPost.execute(postDto);

    expect(postRepository.posts).toHaveLength(1);
    expect(postRepository.posts[0].authorId).toBe(user.authorId);
  });

  it('Should not be able to create a post with an AuthorId that does not exist', async () => {
    const postDto = MakePost({ authorId: 999 });

    await expect(createPost.execute(postDto)).rejects.toThrow(
      new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND)
    );
  });
});

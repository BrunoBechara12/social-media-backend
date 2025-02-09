import { InMemoryPostRepository } from "test/repositories/InMemoryPost.repository";
import { Create } from "../Create";
import { MakePost } from "test/factories/Post.factory";
import { InMemoryUserRepository } from "test/repositories/InMemoryUser.repository";

describe('Create post', () => {
  it('Should be able to create a post', async () => {
    const postRepository = new InMemoryPostRepository();
    const userRepository = new InMemoryUserRepository();
    const createPost = new Create(postRepository, userRepository);

    const postDto = MakePost();

    await createPost.execute(postDto);

    expect(postRepository.posts).toHaveLength(1);
    expect(postRepository.posts[0].authorId).toBe(postDto.authorId);
  });

  it('Should not be able to create a post with an AuthorId that does not exist', async () => {
    const postRepository = new InMemoryPostRepository();
    const userRepository = new InMemoryUserRepository();
    const createPost = new Create(postRepository, userRepository);

    const postDto = MakePost({ authorId: 999 }); // Assuming 999 is a non-existent authorId

    await expect(createPost.execute(postDto)).rejects.toThrow(
      "Author does not exist"
    );
  });
});

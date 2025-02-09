import { Post } from "@prisma/client";
import { UpdatePostDto } from "src/post/infra/dtos/UpdatePost.dto";
import { PostRepository } from "src/post/use-cases/ports/Post.repository";
import { HttpException, HttpStatus } from "@nestjs/common";
import { User } from "@prisma/client";

export class InMemoryPostRepository implements PostRepository {
  public posts: Post[] = [];
  public users: User[] = [];

  async create(post: Post): Promise<void> {
    const userExists = this.users.some(user => user.id === post.authorId);

    if (!userExists) {
      throw new HttpException("Usuário não encontrado para o id informado", HttpStatus.NOT_FOUND);
    }

    const newPost: Post = {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.posts.push(newPost);
  }

  async findByAuthorId(authorId: number): Promise<Post[]> {
    const posts = this.posts.filter(post => post.authorId === authorId);

    if (posts.length === 0) {
      throw new HttpException("O usuario ainda não realizou nenhum post", HttpStatus.NOT_FOUND);
    }

    return posts;
  }

  async findById(id: number): Promise<Post | null> {
    const post = this.posts.find(post => post.id === id) || null;

    if (!post) {
      throw new HttpException("Post não encontrado para o id informado", HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async update(postUpdate: UpdatePostDto): Promise<void> {
    const post = this.posts.find(p => p.id === postUpdate.id);

    if (!post) {
      throw new HttpException("Post não encontrado para o id informado", HttpStatus.NOT_FOUND);
    }

    Object.assign(post, postUpdate, { updatedAt: new Date() });
  }

  async delete(id: number): Promise<void> {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  async getAll(): Promise<Post[]> {
    return this.posts;
  }

  async getById(id: number): Promise<Post | null> {
    const post = this.posts.find(post => post.id === id) || null;

    if (!post) {
      throw new HttpException('O usuário ainda não fez nenhum post', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async getAllByAuthor(authorId: number): Promise<Post[] | null> {
    const posts = this.posts.filter(post => post.authorId === authorId);

    if (posts.length === 0) {
      throw new HttpException('Post não encontrado para o id informado', HttpStatus.NOT_FOUND);
    }

    return posts;
  }
}

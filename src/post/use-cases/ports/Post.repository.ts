import { Post } from "@prisma/client";
import { CreatePostDto } from "src/post/infra/dtos/CreatePost.dto";
import { UpdatePostDto } from "src/post/infra/dtos/UpdatePost.dto";
import { PostResponseDto } from "src/post/infra/dtos/PostResponse.dto";

export abstract class PostRepository {
  abstract getAll(): Promise<PostResponseDto[]>;
  abstract getById(id: number): Promise<Post | null>;
  abstract getAllByAuthor(id: number): Promise<Post[] | null>;
  abstract create(createPost: CreatePostDto): Promise<void>;
  abstract update(UpdatePost: UpdatePostDto): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
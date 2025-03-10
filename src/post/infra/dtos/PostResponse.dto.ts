import { Post } from "@prisma/client"

export interface PostResponseDto extends Post {
  likes: number;
  comments: number;
}

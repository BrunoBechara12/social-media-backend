import { Replace } from 'src/helpers/Replace';

export interface PostProps {
  id: number;
  content: string;
  images: string[];
  authorId: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Post {
  private data: PostProps;

  constructor(
    props: Replace<PostProps, { createdAt?: Date; updatedAt?: Date | null }>
  ) {
    this.data = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): number {
    return this.data.id;
  }

  public set content(content: string) {
    this.data.content = content;
    this.updateTimestamp();
  }

  public get content(): string {
    return this.data.content;
  }

  public set images(images: string[]) {
    this.data.images = images;
    this.updateTimestamp();
  }

  public get images(): string[] {
    return this.data.images;
  }

  public set authorId(authorId: number) {
    this.data.authorId = authorId;
    this.updateTimestamp();
  }

  public get authorId(): number {
    return this.data.authorId;
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.data.updatedAt;
  }

  private updateTimestamp(): void {
    this.data.updatedAt = new Date();
  }
}
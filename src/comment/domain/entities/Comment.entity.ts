export type CommentProps = {
  id?: number;
  content: string;
  authorId: number;
  postId: number;
  commentId?: number | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  replies?: Comment[];
  parent?: Comment | null;
};

export class Comment {
  private props: CommentProps;

  constructor(props: CommentProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || null,
    };
  }

  get id(): number | undefined {
    return this.props.id;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): number {
    return this.props.authorId;
  }

  get postId(): number {
    return this.props.postId;
  }

  get commentId(): number | null | undefined {
    return this.props.commentId;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  get replies(): Comment[] | undefined {
    return this.props.replies;
  }

  get parent(): Comment | null | undefined {
    return this.props.parent;
  }

  set content(content: string) {
    this.props.content = content;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      authorId: this.authorId,
      postId: this.postId,
      commentId: this.commentId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      replies: this.replies,
      parent: this.parent,
    };
  }
}

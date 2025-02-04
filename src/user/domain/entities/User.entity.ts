import { Replace } from 'src/helpers/Replace';

export interface UserProps {
  id: number;
  email: string;
  username: string;
  password: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private data: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date | null }>
  ) {
    this.data = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): number {
    return this.data.id;
  }

  public set email(email: string) {
    this.data.email = email;
    this.updateTimestamp();
  }

  public get email(): string {
    return this.data.email;
  }

  public set username(username: string) {
    this.data.username = username;
    this.updateTimestamp();
  }

  public get username(): string {
    return this.data.username;
  }

  public set password(password: string) {
    this.data.password = password;
    this.updateTimestamp();
  }

  public get password(): string {
    return this.data.password;
  }

  public set bio(bio: string | null) {
    this.data.bio = bio;
    this.updateTimestamp();
  }

  public get bio(): string | null | undefined {
    return this.data.bio;
  }

  public set avatar(avatar: string | null) {
    this.data.avatar = avatar;
    this.updateTimestamp();
  }

  public get avatar(): string | null | undefined {
    return this.data.avatar;
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
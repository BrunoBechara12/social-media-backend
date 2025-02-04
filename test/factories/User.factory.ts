import { User, UserProps } from "../../src/user/domain/entities/User.entity";

type Override = Partial<UserProps> 

export function MakeUser(override: Override = {}) {
  return new User({
    id: 1,
    email: 'johndoe@gmail.com',
    username: 'John Doe',
    createdAt: new Date(),
    password: override.password || '123456',
    ...override  
  })
}
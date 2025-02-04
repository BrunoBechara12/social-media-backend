import { MakeUser } from "../../../../test/factories/User.factory";
import { InMemoryUserRepository } from "../../../../test/repositories/InMemoryUser.repository";
import { GetById } from "../GetById";
import { UserMapper } from "../../domain/mappers/User.mapper";

describe('Get user by id', () => {
  it('Should be able to get a user by id', async () => {
    const userRepository = new InMemoryUserRepository();
    const getById = new GetById(userRepository);

    const user = MakeUser();

    userRepository.users.push(UserMapper.toPrisma(user));

    const foundUser = await getById.execute(user.id); 

    expect(foundUser).toBeTruthy();
  });

  it('Should not be able to get a user by id that does not exist', async () => {
    const userRepository = new InMemoryUserRepository();
    const getById = new GetById(userRepository);

    const user = MakeUser();

    userRepository.users.push(UserMapper.toPrisma(user));

    expect(getById.execute(2)).rejects.toThrow(
      "Usuário não encontrado para o id informado"
    );
  });
});
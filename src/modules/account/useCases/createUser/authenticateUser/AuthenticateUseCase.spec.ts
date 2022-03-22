import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/account/repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../CreateUserUseCase";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { AppErrors } from "@error/AppErrors";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate User",() => {
    beforeEach(() => {
      usersRepositoryInMemory = new UserRepositoryInMemory();
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
      authenticateUseCase = new AuthenticateUseCase(usersRepositoryInMemory);
  });

  it("should not be able to authenticate an user non-exist", async () => {

      await expect(
        authenticateUseCase.execute({
          password: "231SQW",
          email: "error@.com"
        })
        ).rejects.toEqual(new AppErrors("User doesn't exists"))
  });
  
  it("should not be able authenticate with a incorrect password", async () => {
        const user: ICreateUserDTO = {
          drive_license: "1234",
          name: "guga auth",
          email: "guga@gmail.com",
          password: "1234",
        };
          await createUserUseCase.execute(user);

          await expect(
            authenticateUseCase.execute({
            email: user.email,
            password: "password incorrect!"
          })
          ).rejects.toEqual(new AppErrors("Passoword or Email incorrect!"))
  });

    it("should be able to authenticate an user",async () => {
      const user: ICreateUserDTO = {
       name: "guga",
       email: "guga@.com",
       password: "1234",
       drive_license: "ABC-2212",
      }
      await createUserUseCase.execute(user);

      const result = await authenticateUseCase.execute({
        password: user.password,
        email: user.email
      });

     expect(result).toHaveProperty("token");
    });
});

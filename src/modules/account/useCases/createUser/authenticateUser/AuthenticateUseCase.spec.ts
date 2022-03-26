import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UserRepositoryInMemory } from "@modules/account/repositories/in-memory/UserRepositoryInMemory"
import { UsersTokensRepository } from "@modules/account/infra/repositories/UsersTokensRepository";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
import { CreateUserUseCase } from "../CreateUserUseCase";
import { AppErrors } from "@error/AppErrors";
import { randomUUID } from "crypto";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let authenticateUseCase: AuthenticateUseCase;
let usersTokensRepository: UsersTokensRepository;
let dayjsDateProvider: DayjsDateProvider;

describe("Authenticate User",() => {
    beforeEach(() => {
      usersRepositoryInMemory = new UserRepositoryInMemory();
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
      authenticateUseCase = new AuthenticateUseCase(
        usersRepositoryInMemory,
        usersTokensRepository,
        dayjsDateProvider,
        );
  });

  it("should not be able to authenticate an user non-exist", async () => {

      await expect(
        authenticateUseCase.execute({
          password: "231SQW",
          email: "error@.com"
        })
        ).rejects.toEqual(new AppErrors("User doesn't exists"))
  });
  
  // it("should not be able authenticate with a incorrect password", async () => {
  //       const user: ICreateUserDTO = {
  //         drive_license: "1234",
  //         name: "guga auth",
  //         email: "guga@gmail.com",
  //         password: "1234",
  //       };
  //         await createUserUseCase.execute(user);

  //         await expect(
  //           authenticateUseCase.execute({
  //           email: user.email,
  //           password: "password incorrect!"
  //         })
  //         ).rejects.toEqual(new AppErrors("Passoword or Email incorrect!"))
  // });

    // it("should be able to authenticate an user",async () => {
    //   const user: ICreateUserDTO = {
    //    name: "guga",
    //    email: "guga@.com",
    //    password: "1234",
    //    drive_license: "ABC-2212",
    //   }
    //   await createUserUseCase.execute(user);

    //   const result = await authenticateUseCase.execute({
    //     password: user.password,
    //     email: user.email
    //   });

    //  expect(result).toHaveProperty("token");
    // });

    // describe("refresh token", () => {
    //   it("should be able refresh token for token from user", async () => {
    //     const user = await usersTokensRepository.create({
    //       expires_date: new Date('04-04-2022'),
    //       refresh_token: "refresh_token here!",
    //       user_id: randomUUID()
    //     });
  
    //   expect(user).toHaveProperty("refresh_token");
    //   });
    // });

    // it("should be able find user by id and refresh token", async () => {
    //   const user: ICreateUserDTO = {
    //     drive_license: "1234",
    //     name: "guga auth",
    //     email: "guga@gmail.com",
    //     password: "1234",
    //   };
        
    //     await createUserUseCase.execute(user);

    //     const token = await authenticateUseCase.execute({
    //       password: user.password,
    //       email: user.email
    //     });

    //     const result = await usersTokensRepository.findUserByIdAndRefreshToken(user.id, token.refresh_token);

    //     expect(result).toBe(true);
    //   });

  //   it("should be able delete user by id", async () => {
  //     const user: ICreateUserDTO = {
  //       drive_license: "1234",
  //       name: "guga auth",
  //       email: "guga@gmail.com",
  //       password: "1234",
  //     };

  //     await createUserUseCase.execute(user);
  //     const result = await usersTokensRepository.deleteById(user.id);
      
  //     expect(result).toBe(true);
  // });
});

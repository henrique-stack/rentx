import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppErrors } from "@error/AppErrors";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);
  });

    it("should not be able to create a new category with name exists", async () => {
        const category = {
            name: "Test Passed",
            description: "Category already exists!",
        };

          await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
          });

          await expect(
          createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
          }))
          .rejects.toEqual(new AppErrors("Category already exists"));
  });

  it("should be able to create a new category", async () => {
  
      const category = {
        name: "Cateogory Test",
        description: "Category description Test",
      };
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      const categoryCreated = await categoryRepositoryInMemory.findByName(category.name)
      expect(categoryCreated).toHaveProperty("id");
  });
});

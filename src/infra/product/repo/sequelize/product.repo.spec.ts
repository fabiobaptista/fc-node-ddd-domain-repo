import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepo from "./product.repo";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepo = new ProductRepo();
    const product = new Product("1", "Product", 100);

    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should update a product", async () => {
    const productRepo = new ProductRepo();
    const product = new Product("1", "Product", 100);

    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON())
      .toStrictEqual({
        id: product.id,
        name: product.name,
        price: product.price,
      });

    product.changeName("Product Changed");
    product.changePrice(200);

    await productRepo.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel2.toJSON())
      .toStrictEqual({
        id: product.id,
        name: product.name,
        price: product.price,
      });
  });

  it("should find a product", async () => {
    const productRepo = new ProductRepo();
    const product = new Product("1", "Product", 100);

    await productRepo.create(product);

    const productModel = await ProductModel.findOne({ where: { id: product.id } });

    const foundProduct = await productRepo.find(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepo = new ProductRepo();
    const product = new Product("1", "Product", 100);
    await productRepo.create(product);

    const product2 = new Product("2", "Product", 200);
    await productRepo.create(product2);

    const foundProducts = await productRepo.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });

});
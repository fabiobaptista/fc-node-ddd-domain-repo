import Product from "../../../../domain/product/entity/product";
import ProductRepoInterface from "../../../../domain/product/repo/product.repo.interface";
import ProductModel from "./product.model";

export default class ProductRepo implements ProductRepoInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel) =>
      new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
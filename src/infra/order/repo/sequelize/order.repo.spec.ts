import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";
import Address from "../../../../domain/customer/value-objects/address";
import OrderItem from "../../../../domain/order/entity/order-item";
import OrderFactory from "../../../../domain/order/factory/order.factory";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repo/sequelize/customer.model";
import CustomerRepo from "../../../customer/repo/sequelize/customer.repo";
import ProductModel from "../../../product/repo/sequelize/product.model";
import ProductRepo from "../../../product/repo/sequelize/product.repo";
import OrderItemModel from "./ordem-item.model";
import OrderModel from "./order.model";
import OrderRepo from "./order.repo";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {

    // Arrange
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));
    await customerRepo.create(customer);

    const product = new Product("1", "Product", 10);
    await productRepo.create(product);

    const order = OrderFactory.create({
      id: "1",
      customerId: customer.id,
      items: [new OrderItem("1", product.name, product.price, product.id, 2)]
    });

    //Act
    await orderRepo.create(order);

    //Assert
    const orderDb = await orderRepo.find(order.id);

    expect(orderDb).toStrictEqual(order);
  });

  it("should update a order", async () => {

    // Arrange
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));
    await customerRepo.create(customer);

    // Creating first Item
    const product1 = new Product("1", "Product", 10);
    await productRepo.create(product1);
    
    const order = OrderFactory.create({
      id: "1",
      customerId: customer.id,
      items: [new OrderItem("1", product1.name, product1.price, product1.id, 2)]
    });

    await orderRepo.create(order);

    let orderDb = await orderRepo.find(order.id);

    // Updating with second Item
    const product2 = new Product("2", "Product", 10);
    await productRepo.create(product2);
    
    orderDb.addOrderItem(new OrderItem("2", product2.name, product2.price, product2.id, 2));

    await orderRepo.update(orderDb);

    // Assert
    const updOrderDb = await orderRepo.find(order.id);

    expect(updOrderDb).toStrictEqual(orderDb);
  });

  it("should find a order", async () => {
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    // Arrange
    // Customer
    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));

    await customerRepo.create(customer);

    // Product
    const product = new Product("1", "Product", 10);
    await productRepo.create(product);

    // Order
    const order =  OrderFactory.create({
        id: "1",
        customerId: customer.id,
        items: [new OrderItem("1", product.name, product.price, product.id, 2)] 
      });
    await orderRepo.create(order);

    //Act
    const orderResult = await orderRepo.find(order.id);

    //Assert
    expect(order).toStrictEqual(orderResult);
  });

  it("should find all orders", async () => {

    // Arrange
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    // Customer
    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));

    await customerRepo.create(customer);

    // Product
    const product = new Product("1", "Product", 10);
    await productRepo.create(product);

    // Order 1
    const order1 = OrderFactory.create({
      id: "1",
      customerId: customer.id,
      items: [new OrderItem("1", product.name, product.price, product.id, 2)] 
    });
    await orderRepo.create(order1);

    const order2 = OrderFactory.create({
      id: "2",
      customerId: customer.id,
      items: [new OrderItem("2", product.name, product.price, product.id, 1)] 
    });
    await orderRepo.create(order2);

    //Act
    const orders = await orderRepo.findAll();

    //Assert
    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});

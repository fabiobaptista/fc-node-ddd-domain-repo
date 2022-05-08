import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-objects/address";
import Order from "../../../../domain/order/entity/order";
import OrderItem from "../../../../domain/order/entity/order-item";
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
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    const customer = new Customer("1", "Fabio");
    customer.changeAddress(new Address("Street", 1, "Zipcode", "City"));
    await customerRepo.create(customer);

    const product = new Product("1", "Product", 10);
    await productRepo.create(product);

    const ordemItem = new OrderItem("1", product.name, product.price, product.id, 2);

    const order = new Order("1", customer.id, [ordemItem]);

    await orderRepo.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON())
      .toStrictEqual({
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: [
          {
            id: ordemItem.id,
            name: ordemItem.name,
            price: ordemItem.price,
            quantity: ordemItem.quantity,
            orderId: order.id,
            productId: ordemItem.productId,
          },
        ],
      });
  });

  it("should update a order", async () => {
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    const customer = new Customer("1", "Fabio");
    customer.changeAddress(new Address("Street", 1, "Zipcode", "City"));
    await customerRepo.create(customer);

    const product1 = new Product("1", "Product", 10);
    await productRepo.create(product1);

    const ordemItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);

    const product2 = new Product("2", "Product", 10);
    await productRepo.create(product2);

    const ordemItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);

    const order = new Order("1", customer.id, [ordemItem1, ordemItem2]);

    await orderRepo.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON())
      .toStrictEqual({
        id: order.id,
        customerId: order.customerId,
        total: order.total(),
        items: [
          {
            id: ordemItem1.id,
            name: ordemItem1.name,
            price: ordemItem1.price,
            quantity: ordemItem1.quantity,
            orderId: order.id,
            productId: ordemItem1.productId,
          },
          {
            id: ordemItem2.id,
            name: ordemItem2.name,
            price: ordemItem2.price,
            quantity: ordemItem2.quantity,
            orderId: order.id,
            productId: ordemItem2.productId,
          },
        ],
      });
  });

  it("should find a order", async () => {
    const customerRepo = new CustomerRepo();
    const productRepo = new ProductRepo();
    const orderRepo = new OrderRepo();

    // Arrange
    // Customer
    const customer = new Customer("1", "Fabio");
    customer.changeAddress(new Address("Street", 1, "Zipcode", "City"));
    await customerRepo.create(customer);

    // Product
    const product = new Product("1", "Product", 10);
    await productRepo.create(product);

    // Order
    const order = new Order(
      "1",
      customer.id,
      [ new OrderItem("1", product.name, product.price, product.id, 2) ]
    );
    await orderRepo.create(order);

    //Act
    const orderResult = await orderRepo.find(order.id);

    //Assert
    expect(order).toEqual(orderResult);
  });
});

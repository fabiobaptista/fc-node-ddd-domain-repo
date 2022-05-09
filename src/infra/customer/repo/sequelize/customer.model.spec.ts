import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";
import Address from "../../../../domain/customer/value-objects/address";
import CustomerModel from "./customer.model";
import CustomerRepo from "./customer.repo";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepo = new CustomerRepo();
    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));
    
    await customerRepo.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepo = new CustomerRepo();
    const customer = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));
    
    await customerRepo.create(customer);

    customer.changeName("Fabio Baptista");

    await customerRepo.update(customer);
    
    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepo = new CustomerRepo();
    const customer = CustomerFactory.create("Customer", new Address("Street", 1, "Zipcode", "City"));
    
    await customerRepo.create(customer);

    const customerResult = await customerRepo.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepo = new CustomerRepo();

    expect(async () => {
      await customerRepo.find("123456");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepo = new CustomerRepo();
    const customer1 = CustomerFactory.create("Fabio", new Address("Street", 1, "Zipcode", "City"));
    customer1.addRewardPoints(10);
    
    const customer2 = CustomerFactory.create("Fabio", new Address("Street", 2, "Zipcode", "City"));
    customer2.addRewardPoints(20);

    await customerRepo.create(customer1);
    await customerRepo.create(customer2);

    const customers = await customerRepo.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
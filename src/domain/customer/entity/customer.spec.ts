import Address from "../value-objects/address";
import Customer from "./customer";

describe("Customer unit test", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "Fabio");
    })
      .toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer("1", "");
    })
      .toThrowError("Name is required");
  })

  it("should change name", () => {
    const newName = "Fabio Baptista";
    const customer = new Customer("1", "Fabio");

    customer.changeName(newName);

    expect(customer.name).toBe(newName)
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Fabio");
    const address = new Address("Street", 1, "123456", "City");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate the customer", () => {
    expect(() => {
      const customer = new Customer("1", "Fabio");

      customer.activate();
    })
      .toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Fabio");
    
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Fabio");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
import Address from "../value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {

  it("should create a customer", () => {

    const customerName = "Fabio";
    const customer = CustomerFactory.create(customerName);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe(customerName);
    expect(customer.address).toBeUndefined();

  });

  it("should create a customer with address", () => {

    const customerName = "Fabio";
    const adress = new Address("Street", 1, "Zip", "City");
    const customer = CustomerFactory.create(customerName, adress);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe(customerName);
    expect(customer.address).toBe(adress);

  });
});
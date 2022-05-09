import CustomerFactory from "../../customer/factory/customer.factory";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tets", () => {
  
  it("should place an order", () => {
    const customer = CustomerFactory.create("Fabio");
    const item1 = new OrderItem("1", "Item 1", 10, "1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "1", 1);
    const item2 = new OrderItem("2", "Item 2", 200, "2", 2);

    const order = new Order("1", "1", [item1]);
    const order2 = new Order("2", "1", [item2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});
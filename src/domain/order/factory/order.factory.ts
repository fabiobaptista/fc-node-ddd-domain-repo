import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderFactoryProps from "./order-factory-props.interface";

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      );
    });
    
    return new Order(props.id, props.customerId, items);
  }
}
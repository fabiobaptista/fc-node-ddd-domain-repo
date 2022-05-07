import OrderRepoInterface from "../../../../domain/order/repo/order.repo";
import Order from "../../../../domain/order/entity/order";
import OrderItemModel from "./ordem-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/order/entity/order-item";

export default class OrderRepo implements OrderRepoInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customerId: entity.customerId,
        items: entity.items.map(i => ({ 
          id: i.id,
          name: i.name,
          productId: i.productId,
          quatity: i.quantity,
          price: i.price
        })),
        total: entity.total()
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id } });
    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(i => new OrderItem(
        i.id,
        i.name,
        i.price,
        i.productId,
        i.quantity
      ))
    );
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    return orderModels.map((order) =>
    new Order(
      order.id,
      order.customerId,
      order.items.map(i => new OrderItem(
        i.id,
        i.name,
        i.price,
        i.productId,
        i.quantity
      ))
    )
    );
  }
}
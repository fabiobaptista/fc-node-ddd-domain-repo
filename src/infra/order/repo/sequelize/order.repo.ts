import OrderRepoInterface from "../../../../domain/order/repo/order.repo.interface";
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
    try{

      await OrderModel.sequelize.transaction(async (transaction) => {
        //Clear Items
        await OrderItemModel.destroy({
          where: { orderId: entity.id },
          transaction: transaction,
        });
        
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
          orderId: entity.id,
        }));
        
        // Add Items
        await OrderItemModel.bulkCreate(items, { transaction: transaction });
        
        // Update Order
        await OrderModel.update(
          { total: entity.total() },
          { 
            where: { id: entity.id },
            transaction: transaction 
          }
        );

      });

    } catch(err) {
      console.log(err)
    }
  }
  async find(id: string): Promise<Order> {

    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
         where: { id },
         include: [
          { model: OrderItemModel }
        ],
         rejectOnEmpty: true
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    return new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items?.map(i => new OrderItem(
        i.id,
        i.name,
        i.price,
        i.productId,
        i.quantity
      ))
    );
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [
        { model: OrderItemModel }
      ],
    });
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
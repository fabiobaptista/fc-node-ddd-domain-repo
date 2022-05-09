import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/repo/sequelize/customer.model";
import OrderItemModel from "./ordem-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  customerId: string;

  @BelongsTo(() => CustomerModel)
  customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  items: OrderItemModel[];

  @Column({ allowNull: false })
  total: number;
}

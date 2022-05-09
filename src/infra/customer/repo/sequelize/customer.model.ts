import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: number;

  @Column({ allowNull: false })
  zipcode: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  active: boolean;

  @Column({ allowNull: false })
  rewardPoints: number;
}
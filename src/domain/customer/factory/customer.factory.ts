import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-objects/address";

export default class CustomerFactory {

  public static create(name: string, address?: Address): Customer {
    const customer = new Customer(uuid(), name);
    if(address) {
      customer.changeAddress(address);
    }
    return customer;
  }

}
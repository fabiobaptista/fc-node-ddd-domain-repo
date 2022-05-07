import Repository from "../../@shared/repo/repository";
import Customer from "../entity/customer";

export default interface CustomerRepo
  extends Repository<Customer> {}
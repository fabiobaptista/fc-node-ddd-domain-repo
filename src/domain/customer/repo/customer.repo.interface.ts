import RepositoryInterface from "../../@shared/repo/repository.interface";
import Customer from "../entity/customer";

export default interface CustomerRepoInterface
  extends RepositoryInterface<Customer> {}
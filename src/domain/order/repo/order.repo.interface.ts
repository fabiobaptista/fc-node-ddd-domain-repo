import RepositoryInterface from "../../@shared/repo/repository.interface";
import Order from "../entity/order";

export default interface OrderRepoInterface
extends RepositoryInterface<Order> {}
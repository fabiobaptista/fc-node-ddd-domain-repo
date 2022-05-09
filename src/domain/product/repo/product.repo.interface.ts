import RepositoryInterface from "../../@shared/repo/repository.interface";
import Product from "../entity/product";

export default interface ProductRepoInterface
  extends RepositoryInterface<Product> {}
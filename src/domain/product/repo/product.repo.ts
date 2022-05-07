import Repository from "../../@shared/repo/repository";
import Product from "../entity/product";

export default interface ProductRepo
  extends Repository<Product> {}
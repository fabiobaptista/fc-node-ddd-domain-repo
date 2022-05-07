import Product from "./product";

describe("Product unit test", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product", 10);
    })
      .toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 10);
    })
      .toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product", -1);
    })
      .toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const newName = "New Product Name";
    const product = new Product("1", "Product", 10);
    
    product.changeName(newName);

    expect(product.name).toBe(newName);
  });

  it("should change price", () => {
    const newPrice = 20;
    const product = new Product("1", "Product", 10);
    
    product.changePrice(newPrice);
    
    expect(product.price).toBe(newPrice);
  });

  it("should throw error when new price is less than zero", () => {
    expect(() => {
      const newPrice = -1;
      const product = new Product("1", "Product", 10);
    
      product.changePrice(newPrice);
    })
      .toThrowError("Price must be greater than zero");
  });
});
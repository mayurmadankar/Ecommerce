class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes, id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static update(id, data) {
    const product = ProductModel.get(id);
    if (product) {
      Object.assign(product, data);
      return product;
    } else {
      return null;
    }
  }
  static delete(id) {
    const index = products.findIndex((i) => i.id == id);
    if (index != -1) {
      products.splice(index, 1);
    }
  }
}

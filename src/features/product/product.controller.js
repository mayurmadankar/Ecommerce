import ProductModel from "./product.model.js";

class ProductController {

  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, desc, price, category, sizes } = req.body;
    const newProduct = new ProductModel(
      null,
      name,
      desc,
      parseFloat(price),
      req.file.filename,
      category,
      sizes.split(',')
    );
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }
  rateProduct(req,res){
    const {userID,productID,rating}=req.query;
    const error=ProductModel.rateProduct(userID,productID,rating);
    if(error){
      return res.status(400).send(error);
    }else{
      return res.status(200).send("Rating as beein added")
    }
  }
  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
        res.status(404).send('Product not found to get that single product');
    } else {
        return res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
  updateProduct(req,res){
    const updated=ProductModel.update(req.params.id,req.body);
    if(!updated){
        return res.status(404).send('Product not Found for Update Operation');
    }else{
        res.status(201).send(updated);
    }
  }
  deleteProduct(req,res){
    ProductModel.delete(req.params.id);
    res.status(201).send('Product Deleted')
  }
}

export default ProductController;

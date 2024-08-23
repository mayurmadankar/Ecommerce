export default class CartItemModel {
  constructor(id, productID, userID, quantity) {
    this._id = id; // Unique identifier for each cart item
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
  }

  static get(userID) {
    return CartItemModel.cartItems.filter((i) => i.userID == userID);
  }

  static delete(cartItemID, userID) {
    const cartItemIndex = CartItemModel.cartItems.findIndex(
      (i) => i.id == cartItemID && i.userID == userID
    );
    if (cartItemIndex === -1) {
      return "Item not found";
    } else {
      CartItemModel.cartItems.splice(cartItemIndex, 1);
    }
  }
}

// Initialize the cartItems array within the class
CartItemModel.cartItems = [
  new CartItemModel(1, 1, 2, 1),
  new CartItemModel(2, 1, 1, 2)
];

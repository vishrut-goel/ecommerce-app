class Product {
  constructor(title, imageURL, price, desc) {
    this.title = title;
    this.imgURL = imageURL;
    this.price = price;
    this.description = desc;
  }
}

class Element {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProdToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
      <div>
        <img src='${this.product.imgURL}' alt='${this.product.title}' />
        <div class='product-item__content'>
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
    const addBtn = prodEl.querySelector("button");
    addBtn.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [
    new Product(
      "An Alarm Clock",
      "https://picsum.photos/id/175/2896/1944",
      20.99,
      "A beatiful clock"
    ),
    new Product(
      "A pair of Heels",
      "https://picsum.photos/id/21/3008/2008",
      30.99,
      "Elegant off-white heels"
    ),
  ];

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new Element("id", "prod-list"),
    ]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, "prod-list");
      productItem.render();
    }
  }
}

class Cart extends Component {
  items = [];

  get totalAmount() {
    const sum = this.items.reduce(
      (prevVal, curVal) => prevVal + curVal.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class Shop {
  render() {
    this.cart = new Cart('app');
    this.cart.render();
    const productList = new ProductList("app");
    productList.render();
  }
}

class App {
  static init() {
    const shop = new Shop("app");
    shop.render();
    this.cart = shop.cart;
  }

  static addProdToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


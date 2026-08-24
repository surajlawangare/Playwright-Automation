const BasePage = require('./BasePage');

class InventoryPage extends BasePage {

  constructor(page) {
    super(page);

    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryTitle = page.locator('.title');
    this.sortDropDown = page.locator('.product_sort_container');
    this.backpackRemoveButton = page.locator('#remove-sauce-labs-onesie');
  }

  async verifyInventoryPageLoaded() {
    await this.inventoryTitle.waitFor();
  }

  async sortProducts(option) {
    await this.sortDropDown.selectOption(option);
  }

  async openCart() {
    await this.click(this.cartIcon);
  }

  async getCartCount() {
    return await this.getText(this.cartBadge);
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName
    });

    await this.click(
      product.getByRole('button', { name: 'Add to cart' })
    );
  }

  async removeProductFromCart(productName) {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName
    });

    await this.click(
      product.getByRole('button', { name: 'Remove' })
    );
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

}

module.exports = InventoryPage;
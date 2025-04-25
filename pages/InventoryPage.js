class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addBtn = page.locator('button[id="add-to-cart-sauce-labs-backpack"]'); // Указываем конкретный товар
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItem() {
    await this.addBtn.click();
  }

  async gotoCart() {
    await this.cartIcon.click();
  }
}

module.exports = InventoryPage;
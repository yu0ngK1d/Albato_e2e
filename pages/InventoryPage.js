exports.InventoryPage = class InventoryPage {
    constructor(page) {
      this.page = page;
      this.addBtn = page.locator('button[data-test^="add-to-cart"]');
      this.cartIcon = page.locator('.shopping_cart_link');
      this.cartBadge = page.locator('.shopping_cart_badge');
    }
  
    async addItem() {
      await this.addBtn.first().click();
    }
  
    async goToCart() {
      await this.cartIcon.click();
    }
  };
  
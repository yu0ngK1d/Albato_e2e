exports.CartPage = class CartPage {
    constructor(page) {
      this.page = page;
      this.removeBtn = page.locator('button[data-test^="remove"]');
    }
  
    async removeItem() {
      await this.removeBtn.first().click();
    }
  };
  
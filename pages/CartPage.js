class CartPage {
  constructor(page) {
    this.page = page;
    this.removeBtn = page.locator('button[data-test^="remove"]'); // Ищем все кнопки, начинающиеся с "remove"
  }

  async removeItem() {
    await this.removeBtn.first().click();
  }
}

module.exports = CartPage;
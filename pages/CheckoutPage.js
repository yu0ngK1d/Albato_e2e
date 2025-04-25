const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.successMsg = page.locator('[data-test="complete-header"]');
    this.error = page.locator('[data-test="error"]');
  }

  async startCheckout() {
    await this.checkoutBtn.click();
  }

  async fillUserInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueBtn.click();
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async assertSuccess() {
    await expect(this.successMsg).toHaveText('Thank you for your order!');
  }

  async validateFormErrors(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueBtn.click();
    await expect(this.error).toBeVisible();
  }
}

module.exports = CheckoutPage; 
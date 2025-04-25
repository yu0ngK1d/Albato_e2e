const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async goto() {
    try {
      await this.page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });
      await expect(this.page).toHaveURL(/saucedemo\.com/);
    } catch (error) {
      throw new Error(`Failed to load SauceDemo: ${error.message}`);
    }
  }

  async login(user, pass) {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginBtn).toBeVisible();

    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async assertError(expected) {
    await expect(this.error).toBeVisible();
    await expect(this.error).toHaveText(expected);
  }
}

module.exports = LoginPage; // Добавляем экспорт
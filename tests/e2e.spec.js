const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');


test.describe('SauceDemo Tests', () => {
  test('1. Успешная авторизация', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('2. Ошибка при неправильном пароле', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_pass');
    await login.assertError('Username and password do not match');
  });

  test('3. Добавление товара в корзину', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addItem();
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('4. Удаление товара из корзины', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addItem();
    await inventory.goToCart();
    await cart.removeItem();
    await expect(cart.removeBtn).toHaveCount(0);
  });
  
  test('5. Завершение покупки', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
  
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  
    await inventory.addItem();
    await inventory.goToCart();
  
    await checkout.startCheckout();
    await checkout.fillUserInfo('John', 'Doe', '12345');
    await checkout.finishOrder();
    await checkout.assertSuccess();
  });
  
});

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

test.describe('SauceDemo Tests', () => {
  test('1. Успешная авторизация', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('2. Неуспешная авторизация', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_pass');
    await login.assertError('Epic sadface: Username and password do not match any user in this service');
  });

  test('3. Добавление товара в корзину', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await inventory.addItem();
    await expect(inventory.cartBadge).toHaveText('1', { timeout: 10000 });
  });

  test('4. Удаление товара из корзины', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
    await inventory.addItem();
    await inventory.gotoCart();
    console.log('Remove buttons count:', await cart.removeBtn.count()); 
    await expect(cart.removeBtn).toHaveCount(1, { timeout: 10000 });
    await cart.removeItem();
    await expect(cart.removeBtn).toHaveCount(0, { timeout: 10000 });
  });

  test('5. Оформление покупки', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await inventory.addItem();
    await inventory.gotoCart();
    await checkout.startCheckout();
    await checkout.fillUserInfo('John', 'Doe', '12345');
    await checkout.finishOrder();
    await checkout.assertSuccess();
  });

  test('6. Пропущено имя при оформлении', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await inventory.addItem();
    await inventory.gotoCart();
    await checkout.startCheckout();
    await checkout.validateFormErrors('', 'Doe', '12345');
  });

  test('7. Пропущен индекс при оформлении', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await inventory.addItem();
    await inventory.gotoCart();
    await checkout.startCheckout();
    await checkout.validateFormErrors('John', 'Doe', '');
  });

  test('8. Пустая форма при оформлении', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await inventory.addItem();
    await inventory.gotoCart();
    await checkout.startCheckout();
    await checkout.validateFormErrors('', '', '');
  });
});
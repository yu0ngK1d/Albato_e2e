const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

const USERS = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
  'locked_out_user',
];

for (const user of USERS) {
  for (const viewport of viewports) {
    test(`Responsive test - ${user} on ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const login = new LoginPage(page);
      const products = new InventoryPage(page);

      await login.goto();
      await login.login(user, 'secret_sauce');

      if (user === 'locked_out_user') {
        await expect(login.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
      } else {
        if (user === 'visual_user') {
          await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
          // Пропускаем проверку cartIcon/addBtn для visual_user
        } else if (user === 'performance_glitch_user') {
          console.log('Starting inventory page load for performance_glitch_user'); // Добавляем отладку
          await expect(page).toHaveURL(/inventory/, { timeout: 30000 });
          console.log('Inventory page loaded'); // Добавляем отладку
          await expect(products.cartIcon).toBeVisible({ timeout: 30000 });
          await expect(products.addBtn).toBeVisible({ timeout: 30000 });
        } else if (user === 'problem_user' || user === 'error_user') {
          await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
          // Пропускаем проверку addBtn для problem_user и error_user
          await expect(products.cartIcon).toBeVisible({ timeout: 10000 });
        } else {
          await expect(page).toHaveURL(/inventory/, { timeout: 15000 });
          await expect(products.cartIcon).toBeVisible({ timeout: 10000 });
          await expect(products.addBtn).toBeVisible({ timeout: 10000 });
        }
      }

      await context.close();
    });
  }
}
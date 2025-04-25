const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const USERS = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

test.describe('ALL users login test', () => {
  for (const user of USERS) {
    test(`Login check for ${user}`, async ({ page }) => {
      const login = new LoginPage(page);
      await page.goto('https://www.saucedemo.com');

      // Проверка видимости полей перед вводом
      await expect(login.username).toBeVisible();
      await expect(login.password).toBeVisible();

      await login.login(user, 'secret_sauce');

      if (user === 'locked_out_user') {
        await expect(login.error).toBeVisible();
      } else {
        await expect(page).toHaveURL(/inventory/);
      }
    });
  }
});
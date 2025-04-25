SauceDemo E2E Tests

Автоматизированные E2E-тесты для сайта [saucedemo.com](https://www.saucedemo.com), реализованные с использованием Playwright и паттерна Page Object Model (POM).

---
 Требования
- Node.js (версия 16 или выше)
- Установленный Playwright

 Установка

1. Склонируй репозиторий:
   git clone <https://github.com/yu0ngK1d/Albato_e2e>
   cd saucedemo-e2
2. Установи зависимости:
   npm install
3. Установи Playwright и браузеры:
   npx playwright install
4. Запуск тестов
   npx playwright test  
   npx playwright test --headed (запуск тестов с открытием браузеров)
   npx playwright test tests/e2e.spec.js --headed (запуск конкретного теста)
   npx playwright show-report (Просмотр отчёта после выполнения тестов)
   npx playwright test --debug (Запуск тестов с отладкой (открывает Playwright Inspector))
5. 
   1.Дополнительные сценарии, которые можно добавить:
Сортировка товаров: тест для сортировки по цене и названию.
Работа с несколькими товарами: добавление 2-3 товаров в корзину.
Переход на страницу товара: клик по товару и возврат назад.
Некорректные данные: ввод эмодзи, пробелов в поля формы.
   2.Улучшение существующих тестов
Улучшить ожидания: заменить toHaveURL(/inventory/) на проверку заголовка:

await expect(page.locator('.title')).toHaveText('Products');
Селекторы: использовать button[id^="add-to-cart"] и [data-test="shopping-cart-link"].
Функциональность в responsive.test.js: проверять добавление товара.

   3. Реальные сценарии
Медленный интернет:
await context.route('**/*', route => {
  route.fulfill({
    status: 200,
    body: route.request().body(),
    headers: route.request().headers(),
    delay: 2000
  });
});
Разные браузеры: запуск в Chrome, Firefox, WebKit.

   4. Оптимизация производительности
Уменьшить тайм-ауты для performance_glitch_user (например, с 30 до 20 секунд).   

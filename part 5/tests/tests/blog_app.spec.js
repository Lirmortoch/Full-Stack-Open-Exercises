// @ts-check
const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
  });
});
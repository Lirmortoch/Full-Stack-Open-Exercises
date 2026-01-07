// @ts-check
const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith } = require('./helper');

describe('Blog app', () => {
  const usernameForTesting = 'john_doe';
  const passwordForTesting = 'securepassword123';
  const nameForTesting = 'John Doe';

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        username: usernameForTesting,
        password: passwordForTesting,
        name: nameForTesting,
      }
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, usernameForTesting, passwordForTesting);

      await expect(page.getByText(`${nameForTesting} logged in`)).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'josth_eod', 'screrg244213');

      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });
});
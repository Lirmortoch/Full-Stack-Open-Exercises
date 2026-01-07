// @ts-check
const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, createBlogWith } = require('./helper');

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

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, usernameForTesting, passwordForTesting);
    });

    test('a new blog can be created', async ({ page }) => {
      createBlogWith(page, 'Why should start using playwright for E2E testing in 2026?', 'https://playwringt-in-2026.com', nameForTesting);

      await expect(page.getByText(`Why should start using playwright for E2E testing in 2026? - ${nameForTesting}`).first()).toBeVisible();
    });

    test('blog can be liked', async ({ page }) => {
      createBlogWith(page, 'Why should start using playwright for E2E testing in 2025?', 'https://playwringt-in-2025.com', nameForTesting);

      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByText('likes 0')).toBeVisible();

      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('likes 1')).toBeVisible();
    });
  });
});
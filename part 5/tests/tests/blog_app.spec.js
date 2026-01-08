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
      await loginWith(page, usernameForTesting, passwordForTesting);

      await expect(page.getByText(`${nameForTesting} logged in`)).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'josth_eod', 'screrg244213');

      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, usernameForTesting, passwordForTesting);
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlogWith(page, 'Why should start using playwright for E2E testing in 2026?', 'https://playwringt-in-2026.com', nameForTesting);

      await expect(page.getByText(`Why should start using playwright for E2E testing in 2026? - ${nameForTesting}`).first()).toBeVisible();
    });

    describe('when several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlogWith(page, 'first blog', 'https://first-blog.com', nameForTesting);
        await createBlogWith(page, 'second blog', 'https://second-blog.com', nameForTesting);
        await createBlogWith(page, 'third blog', 'https://third-blog.com', nameForTesting);
      });

      test('blog can be liked', async ({ page }) => {
        const otherBlogElem = page.getByRole('listitem').filter({ hasText: 'first blog' });

        await page.pause();

        await otherBlogElem.getByRole('button', { name: 'view' }).click();
        await expect(otherBlogElem.getByText('likes 0')).toBeVisible();

        await otherBlogElem.getByRole('button', { name: 'like' }).click();
        await expect(otherBlogElem.getByText('likes 1')).toBeVisible();
      });

      test('user can see \'delete\' button and remove their own blogs', async ({ page }) => {
        const otherBlogElem = page.getByRole('listitem').filter({ hasText: 'second blog' });

        await page.pause();

        await otherBlogElem.getByRole('button', { name: 'view' }).click();
        await expect(otherBlogElem.getByRole('button', { name: 'remove' })).toBeVisible();

        page.once('dialog', dialog => dialog.accept());

        await otherBlogElem.getByRole('button', { name: 'remove' }).click();

        await expect(page.getByRole('listitem').filter({ hasText: 'second blog' })).toHaveCount(0);
      });
    });
  });
});
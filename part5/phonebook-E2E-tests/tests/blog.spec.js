// @ts-check
const { test, expect } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper')

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: 'root',
        password: 'sekret',
      },
    })
    await page.goto('/') // http://localhost:5173
  });

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()

    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  });

  test('login successful', async ({ page }) => {

    await page.getByRole('button', { name: 'log in' }).click()
    await loginWith(page, 'root', 'sekret')

    await expect(page.getByText('logged in successfully')).toBeVisible()
  });

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    await loginWith(page, 'root', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('wrong username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('logged in successfully')).not.toBeVisible()
  });

  test('blog cannot be created when not logged in', async ({ page }) => {
    expect(page.getByRole('button', { name: 'create new blog' })).not.toBeVisible()
  });

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await loginWith(page, 'root', 'sekret')
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url")
      await expect(page.locator('.blog')).toContainText('test title - test author')
    });

    test.describe('and several blogs exist', () => {
      test.beforeEach(async ({ page }) => {
        await createBlog(page, "test title 1", "test author 1", "test url 1")
        await createBlog(page, "test title 2", "test author 2", "test url 2")
      });

      test('blog can be liked', async ({ page }) => {
        const blogLocator = page.locator('.blog').filter({ hasText: /test title 1/ })
        await blogLocator.getByRole('button', { name: 'view' }).click()
        await blogLocator.getByRole('button', { name: 'like' }).click()
        await expect(blogLocator).toContainText(/likes: 1/)
        await blogLocator.getByRole('button', { name: 'like' }).click()
        await expect(blogLocator).toContainText(/likes: 2/)
      });

      test('blog can be deleted', async ({ page }) => {

        const blogLocator = page.locator('.blog').filter({ hasText: /test title 1/ })
        await blogLocator.getByRole('button', { name: 'view' }).click()
        await expect(blogLocator.getByRole('button', { name: 'remove' })).toBeVisible()

        page.on('dialog', async (dialog) => {
          await dialog.accept()
        });
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText(/test title 1 - test author 1/)).not.toBeVisible()
        await expect(page.getByText(/test title 2 - test author 2/)).toBeVisible()
      });

      test('blogs are ordered according to likes', async ({ page }) => {

        // await page.pause()

        const blogLocator1 = page.locator('.blog').filter({ hasText: /test title 1/ })
        const blogLocator2 = page.locator('.blog').filter({ hasText: /test title 2/ })

        await blogLocator1.getByRole('button', { name: 'view' }).click()
        await blogLocator2.getByRole('button', { name: 'view' }).click()

        await blogLocator1.getByRole('button', { name: 'like' }).click()

        await blogLocator2.getByRole('button', { name: 'like' }).click()
        await blogLocator2.getByRole('button', { name: 'like' }).click()

        await expect(page.locator('.blog').first()).toContainText('test title 2 - test author 2')
        await expect(page.locator('.blog').nth(1)).toContainText('test title 1 - test author 1')

      });

    });

  });

  test.describe('when other user is logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await loginWith(page, 'root', 'sekret')

      await createBlog(page, "test title 1", "test author 1", "test url 1")

      await page.getByRole('button', { name: 'logout' }).click()

      await request.post('/api/users', {
        data: {
          username: 'user',
          name: 'user',
          password: 'sekret',
        },
      })

      await loginWith(page, 'user', 'sekret')
    });

    test('blogs are not visible', async ({ page }) => {
      await expect(page.getByText('test title - test author', { exact: true })).not.toBeVisible()
    });
  });


});
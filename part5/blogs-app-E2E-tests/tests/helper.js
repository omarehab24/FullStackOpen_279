const { test, expect } = require('@playwright/test');

const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByPlaceholder('Title').fill(title)
    await page.getByPlaceholder('Author').fill(author)
    await page.getByPlaceholder('Url').fill(url)
    await page.getByRole('button', { name: 'add blog' }).click()
     page.getByText(`a new blog: ${title} by`).waitFor({state: 'hidden'})

    await expect(page.getByText(`${title} - ${author}`)).toBeVisible()
}

module.exports = {
    loginWith, createBlog
}
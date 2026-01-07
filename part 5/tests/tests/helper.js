async function loginWith(page, username, password) {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function createBlogWith(page, title, url, author) {
  await page.getByRole('button', { name: 'create new blog' }).click();

  await page.getByLabel('title').fill(title);
  await page.getByLabel('author').fill(author);
  await page.getByLabel('url').fill(url);

  await page.getByRole('button', { name: 'Create' }).click();
}

export { 
  loginWith, 
  createBlogWith
}
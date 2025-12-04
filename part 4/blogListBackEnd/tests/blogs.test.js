const assert = require('node:assert');
const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

test('blogs returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('get one specific blog', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map(e => e.title);
  assert(contents.includes('React patterns'));
});

test('get right id properties', async () => {
  const response = await api.get('/api/blogs');
  const areHaveProp = response.body.filter(item => Object.hasOwn(item, 'id'));

  assert.strictEqual(areHaveProp.length, helper.initialBlogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Redux useful tricks',
    author: 'Micheal Chan',
    url: 'https://reduxtricks.com/',
    likes: 53,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDataBase = await helper.blogsInDb();
  assert.strictEqual(blogsInDataBase.length, helper.initialBlogs.length + 1);

  const contents = blogsInDataBase.map(b => b.title);
  assert(contents.includes('Redux useful tricks'));
});

test('a blog without likes can be added', async () => {
  const newBlog = {
    title: 'React useful tricks',
    author: 'Micheal Chan',
    url: 'https://reactricks.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDataBase = await helper.blogsInDb();
  assert.strictEqual(blogsInDataBase.length, helper.initialBlogs.length + 1);

  const contents = blogsInDataBase.map(b => b.title);
  assert(contents.includes('React useful tricks'));

  const blogLikes = blogsInDataBase.filter(b => b.title === newBlog.title)[0].likes;
  assert.notStrictEqual(blogLikes, undefined);
});

after(async () => {
  await mongoose.connection.close();
});
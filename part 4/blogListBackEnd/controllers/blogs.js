const jwt = require('jsonwebtoken');
const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

BlogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});
BlogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id) ;
  
  if (blog) {
    response.json(blog);
  }
  else {
    response.status(404).end();
  }
});

BlogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;

  const user = request.user;

  if (body.title === undefined || body.url === undefined) {
    response.status(400).end();
  }
  
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' });
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog)
});    

BlogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'invalid user' });
  }
  
  await Blog.deleteOne(blog);
  response.status(204).end();
});

BlogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  if (!blog) {
    return response.status(404).end();
  }

  response.json(blog);
});

module.exports = BlogsRouter;
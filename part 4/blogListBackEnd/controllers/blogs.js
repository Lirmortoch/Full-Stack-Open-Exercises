const jwt = require('jsonwebtoken');
const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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

BlogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

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

BlogsRouter.delete('/:id', async (request, response, next) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
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
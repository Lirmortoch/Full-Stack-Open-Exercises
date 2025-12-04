const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');
 
BlogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});
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

  if (body.title === undefined || body.url === undefined) {
    response.status(400).end();
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await newBlog.save();
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
const BlogsRouter = require('express').Router();
const Blog = require('./models/blog');

BlogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then(blogs => response.json(blogs))
    .catch(error => next(error));
});
BlogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id) 
    .then(note => {
      if (note) {
        response.json(note);
      }
      else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

BlogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  newBlog.save()
    .then(blog => response.json(blog))
    .catch(error => next(error));
});    

BlogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

BlogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  
});
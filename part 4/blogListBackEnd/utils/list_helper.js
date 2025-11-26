const dummy = blogs => {


  return 1;
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
}

const favBlog = blogs => {
  const reducer = (sum, item) => {
    return sum.likes > item.likes ? sum : item;
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer, 0);
}

const mostBlogs = blogs => {
  const map = {};
  let mostBlogsByAuthor = {
    author: '', blogs: 0
  }

  blogs.forEach(blog => {
    map[blog.author] = (map[blog.author] || 0) + 1;

    if (mostBlogsByAuthor.blogs < map[blog.author]) {
      mostBlogsByAuthor = {
        author: blog.author, 
        blogs: map[blog.author],
      }
    }
  });

  return mostBlogsByAuthor.author === '' ? {} : mostBlogsByAuthor;
}

const mostLikes = blogs => {
  const map = {};
  let mostLikesByAuthor = {
    author: '', likes: 0
  }

  blogs.forEach(blog => {
    map[blog.author] = (map[blog.author] || 0) + blog.likes;

    if (mostLikesByAuthor.likes < map[blog.author]) {
      mostLikesByAuthor = {
        author: blog.author, 
        likes: map[blog.author],
      }
    }
  });

  return mostLikesByAuthor.author === '' ? {} : mostLikesByAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favBlog,
  mostBlogs,
  mostLikes,
}
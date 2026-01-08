import { useState } from "react";

export default function Blog ({ blog, handleLikeBlog, handleDeleteBlog, name }) {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = {display: visibility ? 'none' : ''};
  const showWhenVisible = {display: visibility ? '' : 'none'};

  function handleToggleVisibility() {
    setVisibility(prevVisiStatus => !prevVisiStatus);
  }
  
  return (
    <div className="blog">
      <li style={hideWhenVisible} className="blog-title">
        <span className="blog-title__content">{blog.title} - {blog.author}</span>
        <button onClick={handleToggleVisibility}>view</button>
      </li>
      
      <li style={showWhenVisible}>
        <p className="blog-title">
          <span className="blog-title__content">{blog.title} - {blog.author}</span>
          <button onClick={handleToggleVisibility}>hide</button>
        </p>

        <a href={blog.url}>{blog.url}</a>

        <p>
          <span>likes {blog.likes}</span> 
          <span>
            <button onClick={() => handleLikeBlog(blog.id, blog)}>like</button>
          </span>
        </p>

        <p>{blog.author}</p>

        {blog.author === name && (<button onClick={() => handleDeleteBlog(blog.id, blog)}>remove</button>)}
      </li>
    </div>
  )
}
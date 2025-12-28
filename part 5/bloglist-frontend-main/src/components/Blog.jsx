import { useState } from "react";

export default function Blog ({ blog, handleLikeBlog }) {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = {display: visibility ? 'none' : ''};
  const showWhenVisible = {display: visibility ? '' : 'none'};

  function handleToggleVisibility() {
    setVisibility(prevVisiStatus => !prevVisiStatus);
  }
  
  return (
    <div className="blog">
      <li style={hideWhenVisible}>
        {blog.title} - {blog.author} 
        <button onClick={handleToggleVisibility}>view</button>
      </li>
      <li style={showWhenVisible}>
        <p>
          {blog.title} - {blog.author}
          <button onClick={handleToggleVisibility}>hide</button>
        </p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes} 
          <button onClick={() => handleLikeBlog(blog.id, blog)}>like</button>
        </p>
        <p>{blog.author}</p>
      </li>
    </div>
  )
}
import { useRef } from "react";
import { Link } from "react-router-dom";

import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

export default function Blogs({ blogs }) {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable> 
      <ul className="blogs">
        {blogs.map((blog) => (
          <div className="blogs__blog blog" key={blog.id}>
            <li className="blog-title">
              <span className="blog-title__content">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} - {blog.author}
                </Link>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

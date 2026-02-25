import { Link } from "react-router-dom";

export default function Blogs({ blogs }) {
  return (
    <ul>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
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
  );
}

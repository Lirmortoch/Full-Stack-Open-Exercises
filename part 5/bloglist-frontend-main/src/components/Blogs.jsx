import Blog from "./Blog";

export default function Blogs({ blogs }) {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}

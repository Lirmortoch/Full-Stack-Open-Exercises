import { useSelector } from "react-redux";;

import Blog from "./Blog";

export default function Blogs({ user }) {
  const blogs = useSelector(({ blogs }) => blogs);
 
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          name={user.name}
        />
      ))}
    </ul>
  );
}
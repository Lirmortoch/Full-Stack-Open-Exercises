import { useSelector } from "react-redux";;

import Blog from "./Blog";

export default function Blogs({}) {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({user}) => user);
 
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
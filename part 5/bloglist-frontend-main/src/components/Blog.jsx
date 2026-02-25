import { useDispatch, useSelector } from "react-redux";
import { likeOneBlog, deleteOneBlog } from "../reducers/blogReducer";

export default function Blog({ blog }) {
  const name = useSelector(({ user }) => user).name;
  const dispatch = useDispatch();

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>

      <div className="likes">
        <div>likes {blog.likes}</div>
        <div>
          <button onClick={() => dispatch(likeOneBlog(blog))}>like</button>
        </div>
      </div>

      <p>added by {blog.author}</p>

      {blog.author === name && (
        <button onClick={() => dispatch(deleteOneBlog(blog))}>remove</button>
      )}
    </div>
  );
}

import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { likeOneBlog, deleteOneBlog, addCommentToBlog } from "../reducers/blogReducer";

export default function Blog({ }) {
  const { id } = useParams();

  const name = useSelector(({ user }) => user).name;
  const blogs = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();

  const commRef = useRef();

  const blog = blogs.find(b => b.id === id);
  if (!blog) return <div>Loading...</div>;

  const comments = blog.comments;

  function handleAddComment(e, blog) {
    e.preventDefault();
    const comm = commRef.current.value;

    dispatch(addCommentToBlog(blog, comm));
      
    commRef.current.value = "";
  }

  let commsElem = <p>Here no comments yet. Add one!</p>;
  if (comments.length !== 0) {
    commsElem = (
      <ul>
        {
          comments.map(com => {
            return <li key={com.id}>{com.comment}</li>;
          })
        }
      </ul>
    );
  }

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

      <div>
        <h3>comments</h3>

        <form onSubmit={(e) => handleAddComment(e, blog)}>
          <fieldset>
            <input type="text" placeholder="Enter your comment" ref={commRef} />
          </fieldset>
          <button type="submit">add comment</button>
        </form>

        {commsElem}
      </div>
    </div>
  );
}
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

  const buttonClassName = "hover:text-black rounded-sm pt-[2px] pb-[2px] pl-[18px] pr-[18px] border-1 hover:bg-indigo-700 hover:text-white hover:border-white";
  const commsElemClassName = 'mt-4';

  let commsElem = <p className={commsElemClassName}>Here no comments yet. Add one!</p>;
  if (comments.length !== 0) {
    commsElem = (
      <ul className={commsElemClassName}>
        {
          comments.map(com => {
            return <li key={com.id}>{com.comment}</li>;
          })
        }
      </ul>
    );
  }

  

  return (
    <div className="border-1 p-2 mt-2">
      <h2 className="text-2xl mb-2">
        {blog.title} by {blog.author}
      </h2>

      <a href={blog.url} className="text-indigo-600 hover:text-indigo-900 active:text-gray-700">{blog.url}</a>

      <div className="likes flex items-center mb-2">
        <div>likes {blog.likes}</div>
        <div>
          <button className={buttonClassName} onClick={() => dispatch(likeOneBlog(blog))}>like</button>
        </div>
      </div>

      <p className="">added by {blog.author}</p>

      {blog.author === name && (
        <button onClick={() => dispatch(deleteOneBlog(blog))}>remove</button>
      )}

      <div className="mt-6">
        <h3 className="text-xl">comments</h3>

        <form onSubmit={(e) => handleAddComment(e, blog)} className="mt-[5px] flex gap-2">
          <fieldset className="flex-2">
            <input type="text" placeholder="Enter your comment" ref={commRef} className="border-1 p-2 rounded-[5px] w-[100%]" id="blog-comment" name="blog-comment" />
          </fieldset>
          <button className={`${buttonClassName}`} type="submit">add comment</button>
        </form>

        {commsElem}
      </div>
    </div>
  );
}
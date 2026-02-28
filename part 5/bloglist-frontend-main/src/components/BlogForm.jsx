import { useRef } from "react";
import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";

export default function BlogForm({ blogFormRef }) {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const authorRef = useRef();
  const urlRef = useRef();

  function handleAddBlog(e) {
    e.preventDefault();

    const blog = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    };

    dispatch(appendBlog(blog));
    blogFormRef.current.handleToggleVisibility();

    titleRef.current.value = "";
    authorRef.current.value = "";
    urlRef.current.value = "";
  }

  const buttonClassName = "hover:text-black rounded-sm pt-[2px] pb-[2px] pl-[18px] pr-[18px] border-1 hover:bg-indigo-700 hover:text-white hover:border-white w-fit active:bg-black active:text-white";

  return (
    <>
      <h2 className="text-2xl mb-2">create new</h2>
      <form onSubmit={handleAddBlog} className="flex flex-col gap-2 items-start">
        <fieldset>
          <label htmlFor="blog-form-title">title</label>
          <input
            type="text"
            id="blog-form-title"
            name="blog-form-title"
            ref={titleRef}
            className="border-1 p-1 rounded-[5px] w-[100%]"
            placeholder="Enter title"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="blog-form-author">author</label>
          <input
            type="text"
            id="blog-form-author"
            name="blog-form-author"
            className="border-1 p-1 rounded-[5px] w-[100%]"
            placeholder="Enter author full name"
            ref={authorRef}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="blog-form-url">url</label>
          <input
            type="text"
            id="blog-form-url"
            name="blog-form-url"
            className="border-1 p-1 rounded-[5px] w-[100%]"
            placeholder="Enter url"
            ref={urlRef}
          />
        </fieldset>

        <button type="submit" className={`${buttonClassName} mb-2`}>
          Create
        </button>
      </form>
    </>
  );
}

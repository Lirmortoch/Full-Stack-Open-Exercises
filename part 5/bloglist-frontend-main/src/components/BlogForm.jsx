import { useRef } from "react";

export default function BlogForm({ addBlog }) {
  const titleRef= useRef();
  const authorRef = useRef();
  const urlRef = useRef();

  function handleAddBlog(e) {
    e.preventDefault();

    const blog  = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value,
    };

    addBlog(blog);

    titleRef.current.value = '';
    authorRef.current.value = '';
    urlRef.current.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <fieldset>
          <label htmlFor="blog-form-title">title</label>
          <input type="text" id="blog-form-title" name="blog-form-title" ref={titleRef} />
        </fieldset>
        <fieldset>
          <label htmlFor="blog-form-author">author</label>
          <input type="text" id="blog-form-author" name="blog-form-author" ref={authorRef} />
        </fieldset>
        <fieldset>
          <label htmlFor="blog-form-url">url</label>
          <input type="text" id="blog-form-url" name="blog-form-url" ref={urlRef} />
        </fieldset>
      
        <button type='submit' className="form__btn">Create</button>
      </form>
    </>
  )
}
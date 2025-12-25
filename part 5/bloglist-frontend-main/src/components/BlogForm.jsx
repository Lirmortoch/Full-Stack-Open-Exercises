import { useRef } from "react"

export default function BlogForm({ handleAddBlog }) {
  const titleRef= useRef()
  const authorRef = useRef()
  const urlRef = useRef()

  return (
    <form onSubmit={(e) => handleAddBlog(
      e, 
      titleRef, 
      authorRef,
      urlRef
    )}>

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
  )
}
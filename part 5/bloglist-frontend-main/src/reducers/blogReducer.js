import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      return blogs.sort((a, b) => b.likes - a.likes);
    },
    addNewBlog(state, action) {
      const blog = action.payload;
      return [...state, blog].sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      const blog = action.payload;
      return state.filter(bl => bl.id !== blog.id);
    },
    likeBlog(state, action) {
      const likedBlog = action.payload;
      const likedIndex = state.findIndex(bl => bl.id === likedBlog.id);

      const newState = [...state];
      newState[likedIndex] = likedBlog;
      
      return newState.sort((a, b) => b.likes - a.likes);
    },
  }
});

const { setBlogs, addNewBlog, deleteBlog, likeBlog } = blogSlice.actions;

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAllBlogs();
    dispatch(setBlogs(blogs));
  }
}

const appendBlog = (blog) => {
  return async (dispatch) => {
    const blog = await blogService.createNewBlog(blog);
    dispatch(addNewBlog(blog));
  }
}

const deleteOneBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(deleteBlog(blog));
  }
}

const likeOneBlog = (blog) => {
  return async (dispatch) => {
    const isDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`,
    );

    if (isDelete) {
      const newBlog = { likes: blog.likes + 1}
      const likedBlog = await blogService.updateBlog(blog.id, newBlog);
      dispatch(likeBlog(likedBlog));
    }
  }
}

export { initializeBlogs, appendBlog, deleteOneBlog, likeOneBlog };
export default blogSlice.reducer;
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
  }
});

const { setBlogs, addNewBlog } = blogSlice.actions;

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

export { initializeBlogs, appendBlog };
export default blogSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

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
      return state
        .map(blog => blog.id === likedBlog.id ? likedBlog : blog)
        .sort((a, b) => b.likes - a.likes);
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
    try {
      const newBlog = await blogService.createNewBlog(blog);
      dispatch(addNewBlog(newBlog));
      dispatch(
        showNotification(
          {
            message: `a new blog "${blog.title}" by ${blog.author} has been added`,
            type: "standard-notification",
          }, 5
        ),
      );
    }
    catch(error) {
      console.log("something went wrong: ", error);
      dispatch(showNotification({
        message: "something went wrong", 
        type: "error",
      }, 5));
    }
  }
}

const deleteOneBlog = (blog) => {
  return async (dispatch) => {
    try {
      const isDelete = window.confirm(
        `Remove blog "${blog.title}" by ${blog.author}?`,
      );
      if (isDelete) {
        await blogService.deleteBlog(blog.id);
        dispatch(deleteBlog(blog));
        dispatch(
        showNotification(
          {
            message: `a blog "${blog.title}" by ${blog.author} has been deleted`,
            type: "standard-notification",
          }, 5
        ),
      );
      }
    }
    catch(error) {
      console.log("something went wrong: ", error);
      dispatch(showNotification({
        message: "something went wrong", 
        type: "error",
      }, 5));
    }
  }
}

const likeOneBlog = (blog) => {
  return async (dispatch) => {
      try {
        const newBlog = { likes: blog.likes + 1}
        const likedBlog = await blogService.updateBlog(blog.id, newBlog);
        dispatch(likeBlog(likedBlog));
      }
      catch(error) {
        console.log("something went wrong: ", error);
        dispatch(showNotification({
          message: "something went wrong", 
          type: "error",
        }, 5));
      }
    
  }
}

export { initializeBlogs, appendBlog, deleteOneBlog, likeOneBlog };
export default blogSlice.reducer;
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNewBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlog = async (id, blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAllBlogs,
  getOneBlogById,
  setToken,
  createNewBlog,
  updateBlog,
  deleteBlog,
};

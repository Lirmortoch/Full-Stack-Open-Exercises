import { useContext } from "react";
import Blog from "./Blog";
import { UserContext } from "../store/UserContext";
import { NotificationContext } from "../store/NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

export default function Blogs({ }) {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const { showNotification } = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ['blogs'], 
    queryFn: blogService.getAllBlogs,
    refetchOnWindowFocus: false,
  });
  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
    onError: (error) => {
      console.log("something went wrong: ", error);
      showNotification({
        message: "something went wrong", 
        type: "error"});
    }
  });
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries(['blogs']);
      showNotification({
        message: `a blog "${deletedBlog.title}" was deleted`,
        type: "standard-notification",
      });
    },
    onError: (error) => {
      console.log("something went wrong: ", error);
      showNotification({
        message: "something went wrong", 
        type: "error"
      });
    },
  });

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  function handleLikeBlog(id, blog) {
    const newBlog = {
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate({ id, newBlog });
  }
  function handleDeleteBlog(id, blog) {
    const isDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`,
    );

    if (isDelete) {
      deleteBlogMutation.mutate({ id });
    }
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeBlog={handleLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
          name={user.name}
        />
      ))}
    </ul>
  );
}
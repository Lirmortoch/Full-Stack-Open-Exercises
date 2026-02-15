import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

describe("<Blog />", () => {
  test('if "like" button was clicked twice, event handler will also be called twice', async () => {
    const blogContent = {
      title: "React Test",
      author: "Dan Abramov",
      url: "https://react-test.com",
    };

    const user = userEvent.setup();

    const updateLikeBlog = vi.fn();
    const deleteBlog = vi.fn();

    render(
      <Blog
        handleDeleteBlog={deleteBlog}
        handleLikeBlog={updateLikeBlog}
        blog={blogContent}
      />,
    );

    const likeBtn = screen.getByText("like");

    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(updateLikeBlog.mock.calls).toHaveLength(2);
  });
});

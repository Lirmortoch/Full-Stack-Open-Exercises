import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { expect } from "vitest";

describe("<BlogForm />", () => {
  test("creating new blog with right credentials", async () => {
    const user = userEvent.setup();
    const addBlog = vi.fn();

    render(<BlogForm addBlog={addBlog} />);

    const title = screen.getByLabelText("title");
    const author = screen.getByLabelText("author");
    const url = screen.getByLabelText("url");

    const addBlogBtn = screen.getByText("Create");

    await user.type(title, "React test");
    await user.type(author, "Dan Abramov");
    await user.type(url, "https://react-test.com");
    await user.click(addBlogBtn);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe("React test");
  });
});

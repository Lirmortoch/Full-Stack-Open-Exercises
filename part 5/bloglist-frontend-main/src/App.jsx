import { useRef, useContext } from "react";

import "./App.css";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import UserForm from "./components/UserForm";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
import { UserContext } from "./store/UserContext";

const App = () => {
  const { user, userLogout } = useContext(UserContext);

  const blogFormRef = useRef();

  let mainElem = <UserForm />;
  if (user) {
    mainElem = (
      <div>
        <p>
          {user.name} logged in
          <button onClick={userLogout}>Logout</button>
        </p>

        <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>

        <Blogs />
      </div>
    );
  }

  return (
    <main>
      <h1>Blogs</h1>
      <section>
        <Notification />
        {mainElem}
      </section>
    </main>
  );
};

export default App;

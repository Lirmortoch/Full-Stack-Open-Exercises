import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../reducers/userReducer";

export default function Menu({  }) {
  const user = useSelector(({ user }) => user);

  return (
    <nav>
      <div className="logout">
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <Link to={'/'} className="link">blogs</Link>
      <Link to={'/users'} className="link">users</Link>
    </nav>
  );
}
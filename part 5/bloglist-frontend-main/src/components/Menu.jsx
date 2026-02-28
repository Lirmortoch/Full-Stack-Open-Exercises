import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../reducers/userReducer";

export default function Menu({  }) {
  const user = useSelector(({ user }) => user);

  const buttonClassName = "hover:text-black focus:outline-2 rounded-xs pt-1 pb-1 pl-2 pr-2";
  const linkClassName = `${buttonClassName}`

  return (
    <nav className="flex flex-col mb-6 p-2 bg-[#d4b88a] text-white">
      <div className="logout pb-2">
        {user.name} logged in
        <button className={buttonClassName} onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <div className="">
        <Link to={'/'} className={linkClassName}>blogs</Link>
        <Link to={'/users'} className={linkClassName}>users</Link>
      </div>
    </nav>
  );
}
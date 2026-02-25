import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { initializeUsers } from "../reducers/usersReducer";

export default function Users({}) {
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
 
  return (
    <>
      <h2>Users</h2>
      <div>
        <div className="table">
          <div className="table__header table__col1"></div>
          <div className="table__header table__col2">blogs created</div>
          
          {users.map(user => (
            <Fragment key={user.id}>
              <Link to={`/users/${user.id}`} className="table__col1">{user.name}</Link>
              <div className="table__col2">{user.blogs.length}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
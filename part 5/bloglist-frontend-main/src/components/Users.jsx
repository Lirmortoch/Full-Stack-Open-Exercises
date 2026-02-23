import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
          <div className="table__header"></div>
          <div className="table__header">blogs created</div>
          
          {users.map(user => (
            <>
              <div className="table__col1">{user.name}</div>
              <div className="table__col2">{user.blogs.length}</div>
            </>
            ))}
        </div>
      </div>
    </>
  );
}
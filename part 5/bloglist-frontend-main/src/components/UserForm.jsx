import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

export default function UserForm({}) {
  const dispatch = useDispatch();

  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    dispatch(login(username, password));

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="user-form-username">username</label>
          <input
            type="text"
            id="user-form-username"
            name="user-form-username"
            ref={usernameRef}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="user-form-password">password</label>
          <input
            type="password"
            id="user-form-password"
            name="user-form-password"
            ref={passwordRef}
          />
        </fieldset>
        <button type="submit" className="user-form__btn form__btn">
          Login
        </button>
      </form>
    </>
  );
}

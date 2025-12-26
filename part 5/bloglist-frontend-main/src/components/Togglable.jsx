import { useImperativeHandle, useState } from "react";

export default function Togglable({ children, ref, buttonLabel }) {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = {display: visibility ? 'none' : ''};
  const showWhenVisible = {display: visibility ? '' : 'none'};

  function handleToggleVisibility() {
    setVisibility(prevVisiStatus => !prevVisiStatus);
  }

  useImperativeHandle(ref, () => {
    return { handleToggleVisibility }
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleToggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={handleToggleVisibility} className="cancel-btn">cancel</button>
      </div>
    </div>
  )
}
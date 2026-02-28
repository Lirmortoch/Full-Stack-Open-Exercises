import { useImperativeHandle, useState } from "react";

export default function Togglable({ children, ref, buttonLabel }) {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  function handleToggleVisibility() {
    setVisibility((prevVisiStatus) => !prevVisiStatus);
  }

  useImperativeHandle(ref, () => {
    return { handleToggleVisibility };
  });

  const buttonClassName = "hover:text-black rounded-sm pt-[2px] pb-[2px] pl-[18px] pr-[18px] border-1 hover:bg-indigo-700 hover:text-white hover:border-white w-fit active:bg-black active:text-white";

  return (
    <div>
      <div style={hideWhenVisible} className={buttonClassName}>
        <button onClick={handleToggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={handleToggleVisibility} className={buttonClassName}>
          cancel
        </button>
      </div>
    </div>
  );
}

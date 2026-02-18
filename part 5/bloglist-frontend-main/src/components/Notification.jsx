import { useSelector } from "react-redux";

export default function Notification({}) {
  const { message, type } = useSelector(({ notification }) => notification);

  if (message === null) {
    return null;
  }

  const notificationClassName = `notification ${type}`;

  return <p className={notificationClassName}>{message}</p>;
}

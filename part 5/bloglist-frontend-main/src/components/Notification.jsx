import { useContext } from "react";
import { NotificationContext } from "../store/NotificationContext";

export default function Notification({}) {
  const { notification } = useContext(NotificationContext);
  const { message, type } = notification;

  if (message === null) {
    return;
  }

  const notificationClassName = `notification ${type}`;

  return <p className={notificationClassName}>{message}</p>;
}

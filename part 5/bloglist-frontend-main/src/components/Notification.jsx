export default function Notification({ message, type }) {
  if (message === null) {
    return;
  }

  const notificationClassName = `notification ${type}`;

  return (
    <p className={notificationClassName}>
      {message}
    </p>
  )
}
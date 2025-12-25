export default function Notification({ message, style }) {
  if (message === null) {
    return;
  }

  const notificationClassName = `notification ${style}`;

  return (
    <p className={notificationClassName}>
      {message}
    </p>
  )
}
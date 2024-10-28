export const NotificationBanner = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="notification">
      {message}
    </div>
  );
};

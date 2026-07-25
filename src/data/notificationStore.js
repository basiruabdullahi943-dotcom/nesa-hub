const getNotifications = () => {
  const data = JSON.parse(
    localStorage.getItem("notifications")
  );

  return Array.isArray(data) ? data : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(
    "notifications",
    JSON.stringify(
      Array.isArray(notifications)
        ? notifications
        : []
    )
  );

  // Notify every page that notifications have changed
  window.dispatchEvent(new Event("notificationsUpdated"));
};

export {
  getNotifications,
  saveNotifications
};
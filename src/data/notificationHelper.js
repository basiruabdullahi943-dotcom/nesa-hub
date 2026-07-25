import { getNotifications } from "./notificationStore";

export function sendNotification(title, message) {
  const notificationsEnabled =
    localStorage.getItem("notifications") !== "false";

  const notifications = getNotifications();

  notifications.unshift({
    id: Date.now(),
    title,
    message,
    date: new Date().toLocaleString(),
    read: false
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

  // Notify the Notifications page to reload
  window.dispatchEvent(
    new Event("notificationsUpdated")
  );

  if (notificationsEnabled) {
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: { title, message }
      })
    );
  }
}
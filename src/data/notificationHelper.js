import {
  getNotifications,
  saveNotifications
} from "./notificationStore";

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

  // Save notifications properly
  saveNotifications(notifications);

  // Show toast notification
  if (notificationsEnabled) {
    window.dispatchEvent(
      new CustomEvent("showToast", {
        detail: { title, message }
      })
    );
  }
}
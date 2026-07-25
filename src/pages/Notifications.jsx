import { useEffect, useState } from "react";
import { getNotifications } from "../data/notificationStore";

function Notifications() {

  const [notifications, setNotifications] = useState(
  Array.isArray(getNotifications())
    ? getNotifications()
    : []
);

  const darkMode =
  localStorage.getItem("darkMode") === "true";

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {
  const loadNotifications = () => {
    const data = getNotifications();
    setNotifications(Array.isArray(data) ? data : []);
  };

  // Initial load
  loadNotifications();

  // Listen for all notification updates
  window.addEventListener("notificationsUpdated", loadNotifications);

  return () => {
    window.removeEventListener(
      "notificationsUpdated",
      loadNotifications
    );
  };
}, []);

  const clearNotifications = () => {
  const confirmClear = window.confirm(
    "Clear all notifications?"
  );

  if (!confirmClear) return;

  localStorage.setItem(
    "notifications",
    JSON.stringify([])
  );

  setNotifications([]);
};

  return (
    <div
  style={{
    padding: "20px",
paddingBottom: "160px",
    background: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#f9fafb" : "#111827",
    minHeight: "100vh"
  }}
>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }}
>
  <h1
    style={{
      color: darkMode ? "#f9fafb" : "#111827",
      margin: 0
    }}
  >
    🔔 Notifications
  </h1>

  {notifications.length > 0 && (
    <button
      onClick={clearNotifications}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      🗑 Clear All
    </button>
  )}
</div>

      {notifications.length === 0 ? (

        <div
  style={{
    background: darkMode ? "#1f2937" : "#ffffff",
    padding: "40px 20px",
    borderRadius: "12px",
    textAlign: "center",
    border: darkMode
      ? "1px solid #374151"
      : "1px solid #e5e7eb",
    boxShadow: darkMode
      ? "0 8px 18px rgba(0,0,0,0.35)"
      : "0 8px 18px rgba(0,0,0,0.08)"
  }}
>
  <h3
    style={{
      color: darkMode ? "#f9fafb" : "#111827",
      marginBottom: "10px"
    }}
  >
    No notifications yet
  </h3>

  <p
    style={{
      color: darkMode ? "#d1d5db" : "#6b7280"
    }}
  >
    You don't have any new notifications.
  </p>
</div>

      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            style={{
  background: darkMode ? "#1f2937" : "#ffffff",
  padding: "15px",
  borderRadius: "12px",
  marginBottom: "12px",
  border: darkMode
    ? "1px solid #374151"
    : "1px solid #e5e7eb",
  boxShadow: darkMode
    ? "0 8px 18px rgba(0,0,0,0.35)"
    : "0 8px 18px rgba(0,0,0,0.08)"
}}
          >

            <h3
  style={{
    color: darkMode ? "#f9fafb" : "#111827",
    marginBottom: "8px"
  }}
>
  {item.title}
</h3>

            <p
  style={{
    color: darkMode ? "#d1d5db" : "#4b5563",
    lineHeight: "1.6"
  }}
>
  {item.message}
</p>

          </div>

        ))

      )}

    </div>
  );
}

export default Notifications;
// NotificationSettings.js
import React, { useState } from 'react';
 

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    follow: false,
    mention: false,
    message: false,
    teamInvite: false,
    newProject: false,
    newTask: false,
    topMembers: false,
  });

  const toggleNotification = (setting) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <ul>
        {Object.entries(notificationSettings).map(([setting, value]) => (
          <li key={setting}>
            <label className="toggle-label">
              {setting}
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleNotification(setting)}
              />
              <span className="toggle-slider"></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSettings;

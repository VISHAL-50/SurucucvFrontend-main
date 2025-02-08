// NotificationSettings.js
import React, { useState } from 'react';
import Header from '../MainPage/Header';
import Sidebar from '../MainPage/SideBar';


const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    follow: true,
    mention: true,
    message: true,
    teamInvite: true,
    newProject: true,
    newTask: true,
    topMembers: true,
  });

  const toggleNotification = (type) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (

    
    <div className="grid-container">
    <Header OpenSidebar={OpenSidebar} />
    <Sidebar
      openSidebarToggle={openSidebarToggle}
      OpenSidebar={OpenSidebar} />
    <div className="section-myProfile">
      <div className="main-myProfile">
    <div className="notification-settings">
      <h2>Notification Settings</h2>

      <div className="notification-item">
        <span>Someone follows you</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.follow}
            onChange={() => toggleNotification('follow')}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="notification-item">
        <span>Top Teams this week</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.mention}
            onChange={() => toggleNotification('mention')}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="notification-item">
        <span>Someone invite you to a team</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.follow}
            onChange={() => toggleNotification('follow')}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="notification-item">
        <span>Someone mentions you</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.mention}
            onChange={() => toggleNotification('mention')}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="notification-item">
        <span>Someone sends you a message</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.follow}
            onChange={() => toggleNotification('follow')}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="notification-item">
        <span>Someone update a project</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.mention}
            onChange={() => toggleNotification('mention')}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="notification-item">
        <span>Someone add new project</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.follow}
            onChange={() => toggleNotification('follow')}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="notification-item">
        <span>Someone add new task</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={notificationSettings.mention}
            onChange={() => toggleNotification('mention')}
          />
          <span className="slider"></span>
        </label>
      </div>

       
    </div>

             
    </div>
        </div>
      </div>
  );
};

export default NotificationSettings;

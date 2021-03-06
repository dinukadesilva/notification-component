import React from 'react';
import NotificationIcon from './NotificationIcon';

const NotificationBell = ({unreadCount, toggleList, newNotifications}) => {

	let bellClassNames = 'notification-bell--count pe-label--small';
	
	if (newNotifications) {
		bellClassNames += ' notification-bell--new'
	}

	if (unreadCount === 0) {
		bellClassNames += ' hide-visibility';
	}
	return (
		<a id="notification-bell" aria-label="Notifications" href="javascript:void(0)" className="notification-bell--activate" 
			onClick={toggleList}>
			<span className={unreadCount===0 ? 'pe-sr-only' : 'notification-component--hide'}>Notifications</span>
			<NotificationIcon iconName="notification-18" iconAltText="" />
				 
			<div className={bellClassNames}>
				<span className="pe-sr-only">{unreadCount > 1 ? unreadCount+ 'Unread Notifications' : unreadCount+'Unread Notification'}</span>
				<span>{unreadCount > 9 ? '9+' : unreadCount}</span>
			</div>
		</a>
	);
}

export default NotificationBell;

import React from 'react';

const NotificationBell = ({unreadCount, toggleList, newNotifications}) => {

	let bellClassNames = 'notification-bell--count';
	
	if (newNotifications) {
		bellClassNames += ' notification-bell--new'
	}

	if (unreadCount === 0) {
		bellClassNames += ' hide-visibility';
	}
	return (
		<div id="notification-bell" className="notification-bell" aria-live="polite" aria-atomic="false">
			<a aria-label="Notifications" href="javascript:void(0)" className="notification-bell--activate" onClick={toggleList}>
				<span className={unreadCount===0 ? 'sr-hidden' : 'notification-component--hide'}>Notifications</span>
				<i className="pe-icon--bell" aria-hidden="true"></i>
				<div className={bellClassNames}>
					<span className="sr-hidden">{unreadCount > 1 ? unreadCount+ 'Unread Notifications' : unreadCount+'Unread Notification'}</span>
					<span>{unreadCount > 9 ? '9+' : unreadCount}</span>
				</div>
			</a>
		</div>
	);
}

export default NotificationBell;

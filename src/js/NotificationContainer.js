import React from 'react';
import NotificationList from './NotificationList';
import NotificationDetails from './NotificationDetails';
import NotificationHeading from './NotificationHeading';
import NotificationApi from './NotificationApi';

export default class NotificationContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isArchive: false,
			displayDetails: false,
			notificationDetails: {
				message: {}
			}
		};
		this.showDetails = this.showDetails.bind(this);
		this.showList = this.showList.bind(this);
		this.appendArchiveList = this.appendArchiveList.bind(this);
		this.goToArchiveList = this.goToArchiveList.bind(this);
		this.showNonArchivedList = this.showNonArchivedList.bind(this);
		this.resetListOnCloseDrawer = this.resetListOnCloseDrawer.bind(this);
	}

	showDetails(notification) {
		const state = {
			displayDetails: true,
			notificationDetails: notification
		};
		if(!this.state.isArchive && !notification.isRead) {
			this.props.notificationRead(notification);
		}
		this.refs.heading && this.refs.heading.focus();
		this.setState(state);
	}

	showList() {
		this.setState({
			displayDetails: false
		});
	}

	appendArchiveList(archivedNotification) {
		this.props.archiveNotification(archivedNotification);
		this.setState({
			displayDetails: false
		});
	}

	goToArchiveList() {
		this.refs.closeButton && this.refs.closeButton.focus();
		this.setState({
			isArchive: true
		});
	}

	showNonArchivedList() {
		this.setState({
			isArchive: false
		});
	}

	resetListOnCloseDrawer() {
		this.setState({
			displayDetails: false,
			isArchive: false,
			list: this.state.notificationList
		});
		this.props.closeDrawer();
	}

	hyphenateWords(sentence) {
		const maxLength = 12;
		if (typeof sentence !== 'string') {
			return sentence;
		}
		return sentence.split(' ').map((word) => {
			if (word.length <= maxLength) {
				return word;
			}
			const chunkCount = Math.floor(word.length / maxLength) + 1;
			const chunkSize = Math.round(word.length / chunkCount);

			let result = '';
			for (let spacer = '', i = 0; i < chunkCount; i++) {
				const chunkStart = i * chunkSize;
				const chunkEnd = (i + 1) * chunkSize;
				result += spacer + word.substring(chunkStart, chunkEnd);
				spacer = '\u00AD';
			}
			return result;
		}).join(' ');
	}

	render() {

		// Move the X button up 3px
		const paddingTop = (parseInt(this.props.config.appHeaderClientHeight) - 3) + 'px';
		const closIconPadding = {
			'paddingTop': paddingTop
		}
		return (
			<div aria-label="Notifiations Menu" role="menuitem" className="notification-container">
				<div className="notification-archive--back pe-label pe-label--large">
					<div tabIndex={-1} ref="closeButton">
						<button aria-label="Close Notification" onClick={this.resetListOnCloseDrawer}> 
							<i className="pe-icon--times close-dropdown pointer"></i> 
						</button>
					</div>
				</div>
				<div className="notification-title">
					<div tabIndex={-1} ref="heading">
						<NotificationHeading back={this.showList} isList={!this.state.isArchive && !this.state.displayDetails}
						isDetails={this.state.displayDetails} isArchive={this.state.isArchive} archiveBack={this.showNonArchivedList} />
					</div>
				</div>
				<div className={this.state.displayDetails || this.state.isArchive ? 'notification-content-full': 'notification-content'}>
					<div className={!this.state.isArchive && !this.state.displayDetails ? 'transition-middle' : 'transition-middle transition-to-left'}>
						<div className="content-list">
							<div>
								<NotificationList list={this.props.list} config={this.props.config} showDetails={this.showDetails} isError={this.props.apiError}
								 appendArchiveList={this.appendArchiveList} isArchiveTray={false} goToArchiveList={this.goToArchiveList} hyphenateWords={this.hyphenateWords}/>
							</div>
							<div className="notification-title bottom-archive pe-label pe-label--large">
								<h1 className="notification-title--heading">
									<a href="javascript:void(0);" onClick={this.goToArchiveList} className={this.state.isArchive ? 'hide' : ''}> Notification Archive</a>
								</h1>
							</div>
						</div>
					</div>
					<div className={this.state.isArchive && !this.state.displayDetails ? 'transition-middle': 'transition-middle transition-to-right'}>
						<NotificationList list={this.props.archivedList} config={this.props.config} showDetails={this.showDetails} isError={this.props.apiError}
						 appendArchiveList={this.appendArchiveList} isArchiveTray={true} goToArchiveList={this.goToArchiveList} hyphenateWords={this.hyphenateWords}/>
					</div>
					<div className={this.state.displayDetails ? 'transition-middle' : 'transition-middle transition-to-right'}>
						<NotificationDetails notification={this.state.notificationDetails} closeDrawer={this.props.closeDrawer} apiConfig={this.props.config} appendArchiveList={this.appendArchiveList}
							coachmarkListener={this.props.coachmarkListener} hyphenateWords={this.hyphenateWords}/>
					</div>
				</div>
			</div>
		);
	}
}

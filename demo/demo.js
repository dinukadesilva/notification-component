'use strict';

import NotificationComponent from '../main'; // for direct API usage

const pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=93376b4abed34d778deb37ae54c8455b|2016-05-11T02:03:00+00:00|2016-05-11T05:03:00+00:00|fb0a009077eabec2c93fc5d2e1ff9099';

const AppHeaderConfig = {
	// NotificationAPI
	nfApiUrl: 'https://notifications-api.stg-prsn.com',
	nfContentTypeHeader: 'application/json',
	nfPiToken: pt,
	nfRecipientId: 'ffffffff560c1a1ee4b04ebf43118c60',

	// CoachmarkAPI
	cmApiUrl: 'http://localhost:8080',
	cmContentTypeHeader: 'application/json',
	cmPiToken: pt,

	// FeedbackAPI
	fbApiUrl: 'http://localhost:8080',
	fbContentTypeHeader: 'application/json',
	fbPiToken: pt
};
function init() {

	// Demo eventing API
	document.body.dispatchEvent(new CustomEvent('o.InitNotificationComponent', {
			detail: {
				config: AppHeaderConfig,
				elementId: 'demo-target1'
			}
	 }));

	// Demo direct API
	// new NotificationComponent(
	// 		AppHeaderConfig,
	// 		'demo-target2'
	//  );

}

window.onload = init;

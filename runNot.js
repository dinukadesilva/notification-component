var AppHeaderConfig = {
    UserNotificationURL: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
    AcceptHeader: "*/*",
    ContentTypeHeader: "application/json",
    RecipientId: "ffffffff5482258ce4b05a12806d3b14",
    PiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTQ3MDgyMTIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYTY3YTJkNmViMWE5NDliMWI4NTgwYTIzZDliMTdhNTMiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTQ2OTc0MTJ9.YDC5YEXd0nGam154029x2UvARaj6cynFv6LLY4VDhumhTbwE52MnY9KZBC0Oj-OLVOhnhc3Tjd-SIxk0LxGAP3fg57DT4JvAsI6dZwHJKS6euMrFrbTbNy_B_GautZ8wckzvV8uNEQX0lho2pEFcet946bNo_ydSJGWXwfRVVF8"
}
var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");
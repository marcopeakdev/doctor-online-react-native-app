import { decorate, observable, action, computed } from "mobx";
import { Permissions, Notifications } from 'expo';

class Notification {
  
  constructor() {
    this.token = null;
    this.notification = null;
    this.title = 'Hello World';
    this.body = 'Say Something';
  }


  async registerForPushNotifications(callback) {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }
    
    const token = await Notifications.getExpoPushTokenAsync();
    this.subscription = Notifications.addListener(this.handleNotification);

    this.token = token;
    callback();
  }

  sendPushNotification(token = this.token, title = this.title, body = this.body) {
    return fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
        title: title,
        body: body,
        data: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  handleNotification = notification => {
    this.notification = notification;
  };
}
decorate(Notification, {
  registerForPushNotifications: action,
  sendPushNotification: action,
  handleNotification: action
});

export default new Notification();
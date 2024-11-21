import { Permissions, Notifications } from "expo";

// In this test app we contact the Expo push service directly. You *never*
// should do this in a real app. You should always store the push tokens on your
// own server or use the local notification API if you want to notify this user.
const PUSH_ENDPOINT = "https://expo.io/--/api/v2/push/send";

export default async function registerForPushNotificationsAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync();

  return token;
}

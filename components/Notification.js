import React from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView
} from 'react-native';
import { Permissions, Notifications } from 'expo';
import Store from '../stores/store';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      notification: null,
      title: 'Hello World',
      body: 'Say something!',
    };
  }

  async registerForPushNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();

    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
  }

  sendPushNotification(token = this.state.token, title = this.state.title, body = this.state.body) {
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

  sendToAllUserPushNotification() {

    let user = Store.fullusers;
    let body = [];
    for (let i in user) {
      if (user[i].token) {
        let mem = {};
        mem.to = user[i].token;
        mem.body = "Admin Notification";
        mem.sound = "default";
        body.push(mem);
      }
    }
    console.log(JSON.stringify(body));
    if(body.length > 0) {
      return fetch('https://exp.host/--/api/v2/push/send', {
        title: "Admin Notification",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    } else {
      Alert.alert('Please register devices');
      return true;
    }
    
  }

  handleNotification = notification => {
    this.setState({
      notification,
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Send Notification To All User</Text>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          maxLength={100}
          value={this.state.title}
        />
        <Text style={styles.text}>Message</Text>
        <TextInput
          style={styles.input}
          onChangeText={body => this.setState({ body })}
          maxLength={100}
          value={this.state.body}
        />
        {/* <TouchableOpacity
          onPress={() => this.registerForPushNotifications()}
          style={styles.touchable}>
          <Text>Register me for notifications!</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.sendToAllUserPushNotification()} style={styles.touchable}>
          <Text>Send Notification</Text>
        </TouchableOpacity>
        {this.state.token ? (
          <View>
            <Text style={styles.text}>Token</Text>
            <TextInput
              style={styles.input}
              onChangeText={token => this.setState({ token })}
              value={this.state.token}
            />
          </View>
        ) : null}
        {this.state.notification ? (
          <View>
            <Text style={styles.text}>Last Notification:</Text>
            <Text style={styles.text}>{JSON.stringify(this.state.notification.data.message)}</Text>
          </View>
        ) : null}
      </ScrollView> 
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 8,
  },
  text: {
    paddingBottom: 2,
    padding: 8,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  touchable: {
    borderWidth: 1,
    borderRadius: 4,
    margin: 8,
    padding: 8,
    width: '95%',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    margin: 8,
    padding: 8,
    width: '95%',
  },
});
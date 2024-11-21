import React, { Component } from "react";
import { Text, View } from "react-native";
import { observer } from "mobx-react";

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }
}
export default observer(HomeScreen);

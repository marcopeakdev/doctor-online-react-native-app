import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../stores/store";
import { Theme } from "./Theme";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";

import {
  Container,
  Header,
  Content,
  Button,
  Text,
  List,
  View,
  Icon,
  ListItem,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Left
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Picker
} from "react-native";
import authStore from "../stores/authStore";

class Filter extends Component {
  render() {
    return (
      <View>
        <Text>This is the Filter Page </Text>
      </View>
    );
  }
}

export default observer(Filter);

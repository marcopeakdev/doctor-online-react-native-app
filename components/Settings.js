import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../stores/store";
import { Theme } from "./Theme";
import { withNamespaces } from "react-i18next";

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
  TextInput,
  Picker
} from "react-native";
import CollapsingToolbar from "react-native-collapse-view";
import authStore from "../stores/authStore";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.i18n.language
    };
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("more:settings"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  showMe(itemValue) {
    this.setState({ language: itemValue });

    if (this.state.language == "en-US" || this.state.language == "en") {
      this.props.i18n.changeLanguage("ar");
    } else {
      this.props.i18n.changeLanguage("en");
    }
  }

  render() {
    const { t, i18n, navigation } = this.props;
    let lang = i18n.language;
    // if(lang == 'en' || lang == 'en-US') {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableHighlight>
            <List>
              {authStore.isAuthenticated ? (
                <ListItem onPress={() => this.props.navigation.navigate("Edit")}>
                  <Left>
                    <Icon name="md-person" large style={{ color: "#00bfff" }} />
                    <Text>{t("settings:editprofile")}</Text>
                  </Left>
                  <Right>
                    <Icon
                      name="arrow-forward"
                      large
                      style={{ color: "#00bfff" }}
                    />
                  </Right>
                </ListItem>
              ) : (
                <ListItem>
                  <Left>
                    <Text note>{t("settings:loginedityourprofile")}</Text>
                  </Left>
                </ListItem>
              )}
  
              {/* {authStore.isAuthenticated ? (
                <ListItem
                  onPress={() => this.props.navigation.navigate("Schedule")}
                >
                  <Left>
                    <Icon name="md-globe" large style={{ color: "#00bfff" }} />
                    <Text>{t("settings:schedule")}</Text>
                  </Left>
                  <Right>
                    <Icon
                      name="arrow-forward"
                      large
                      style={{ color: "#00bfff" }}
                    />
                  </Right>
                </ListItem>
              ) : (
                <ListItem>
                  <Left>
                    <Text note>{t("settings:schedule")}</Text>
                  </Left>
                </ListItem>
              )} */}
  
              <ListItem>
                <Left>
                  <Icon name="md-globe" large style={{ color: "#00bfff" }} />
                  <Text>{t("settings:changemycountry")}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 13 }} note>
                    {t("more:commingsoon")}
                  </Text>
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Icon name="ios-globe-outline" large style={{ color: "#00bfff" }} />
                  <Text>{t("settings:changelanguage")}</Text>
                </Left>
                <Right>
                  <Picker
                    selectedValue={this.state.language}
                    style={{
                      height: 50,
                      width: 100,
                      justifyContent: "center",
                      alignContent: "center",
                      alignSelf: "center"
                    }}
                    onValueChange={(itemValue, itemIndex) => this.showMe(itemValue)}
                  >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Arabic" value="ar" />
                  </Picker>
                </Right>
              </ListItem>
            </List>
          </TouchableHighlight>
          
        </View>
      );
    // } else {
    //   return (
    //     <View style={{ flex: 1, backgroundColor: "white" }}>
    //       <TouchableHighlight>
    //         <List>
    //           {authStore.isAuthenticated ? (
    //             <ListItem onPress={() => this.props.navigation.navigate("Edit")}>
    //               <Left>
    //                 <Icon
    //                   name="arrow-forward"
    //                   large
    //                   style={{ color: "#00bfff" }}
    //                 />
    //               </Left>
    //               <Right>
    //                 <Icon name="md-person" large style={{ color: "#00bfff" }} />
    //                 <Text>{t("settings:editprofile")}</Text>
    //               </Right>
    //             </ListItem>
    //           ) : (
    //             <ListItem>
    //               <Left></Left>
    //               <Right>
    //                 <Text note>{t("settings:loginedityourprofile")}</Text>
    //               </Right>
    //             </ListItem>
    //           )}
  
    //           {authStore.isAuthenticated ? (
    //             <ListItem
    //               onPress={() => this.props.navigation.navigate("Schedule")}
    //             >
    //               <Left>
    //                 <Icon
    //                   name="arrow-forward"
    //                   large
    //                   style={{ color: "#00bfff" }}
    //                 />
    //               </Left>
    //               <Right>
    //                 <Icon name="md-globe" large style={{ color: "#00bfff" }} />
    //                 <Text>{t("settings:schedule")}</Text>
    //               </Right>
                  
    //             </ListItem>
    //           ) : (
    //             <ListItem>
    //               <Left></Left>
    //               <Right>
    //                 <Text note>{t("settings:schedule")}</Text>
    //               </Right>
    //             </ListItem>
    //           )}
  
    //           <ListItem>
    //             <Left>
    //               <Text style={{ fontSize: 13 }} note>
    //                 {t("more:commingsoon")}
    //               </Text>
    //             </Left>
    //             <Right>
    //               <Icon name="md-globe" large style={{ color: "#00bfff" }} />
    //               <Text>{t("settings:changemycountry")}</Text>
    //             </Right>
                
    //           </ListItem>
    //           <ListItem>
    //             <Left>
    //               <Picker
    //                 selectedValue={this.state.language}
    //                 style={{
    //                   height: 50,
    //                   width: 100,
    //                   justifyContent: "center",
    //                   alignContent: "center",
    //                   alignSelf: "center"
    //                 }}
    //                 onValueChange={(itemValue, itemIndex) => this.showMe(itemValue)}
    //               >
    //                 <Picker.Item label={t("more:english")} value="en" />
    //                 <Picker.Item label={t("more:arabic")} value="ar" />
    //               </Picker>
    //             </Left>
    //             <Right>
    //               <Icon name="ios-globe-outline" large style={{ color: "#00bfff" }} />
    //               <Text>{t("settings:changelanguage")}</Text>
    //             </Right>
    //           </ListItem>
    //         </List>
    //       </TouchableHighlight>
          
    //     </View>
    //   );
    // }
    
  }
}

// export default observer(Settings);
export default withNamespaces(["settings", "common", "other"], { wait: true })(
  Settings
);

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 30,
  //   backgroundColor: "#fff",
  //   justifyContent: "center",
  //   paddingHorizontal: 10
  // }
});

const pickerSelectStyles = StyleSheet.create({
  // inputIOS: {
  //   fontSize: 16,
  //   paddingTop: 13,
  //   paddingHorizontal: 10,
  //   paddingBottom: 12,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   borderRadius: 4,
  //   backgroundColor: "white",
  //   color: "black"
  // }
});

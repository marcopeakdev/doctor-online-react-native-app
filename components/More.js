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
import { withNamespaces } from "react-i18next";

import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image
} from "react-native";
import CollapsingToolbar from "react-native-collapse-view";
import authStore from "../stores/authStore";

class More extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("more:settings"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  render() {
    const { t, i18n, navigation } = this.props;
    let lang = i18n.language;

    let isDoctor = "";
    if (authStore.isAuthenticated) {
      isDoctor = Store.findDoctorInUsers(authStore.user.user_id);
      if(authStore.user) {
        if (authStore.user.username == "admin") {
          isDoctor = authStore.user.user_id;
        }
      }
    }
    // if(lang == 'en' || lang == 'en-US') {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <TouchableHighlight>
            <List>
            { authStore.isAuthenticated ?
            <ListItem
                onPress={() =>
                  this.props.navigation.navigate("FavouriteDoctor")
                }
              >
                <Left>
                  <Icon name="md-contact" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:favouritedoctor")}</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-forward"
                    large
                    style={{ color: "#00bfff" }}
                  />
                </Right>
              </ListItem> : 
              <Text />
              }
              { authStore.isAuthenticated ?
            <ListItem
                onPress={() =>
                  this.props.navigation.navigate("BookSuccess")
                }
              >
                <Left>
                  <Icon name="book" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:booksuccess")}</Text>
                </Left>
                <Right>
                  <Icon
                    name="arrow-forward"
                    large
                    style={{ color: "#00bfff" }}
                  />
                </Right>
              </ListItem> : 
              <Text />
              }
              {isDoctor ? (
                
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate("AppointmentManage")
                  }
                >
                  <Left>
                    <Icon name="clock" large style={{ color: "#00bfff" }} />
                    <Text>{t("more:appointmentmanage")}</Text>
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
                <Text />
              )}
              <ListItem
                onPress={() => this.props.navigation.navigate("Settings")}
              >
                <Left>
                  <Icon name="md-settings" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:settings")}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
                </Right>
              </ListItem>
  
              <ListItem>
                <Left>
                  <Icon name="ios-call" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:contactus")}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Icon name="md-bulb" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:aboutus")}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
                </Right>
              </ListItem>
              { authStore.isAuthenticated ?
                  <ListItem 
        onPress={() => {
                    authStore.logoutUser(),
                      alert("You logged out"),
                      this.props.navigation.navigate("FirstPage");
                  }}
            >
                  <Left>
                    <Icon name="log-out" large style={{ color: "#00bfff" }} />
                    <Text>{t("more:logout")}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
                  </Right>
                </ListItem> : 
                <Text></Text>
              }
              
              <ListItem>
                <Left>
                  <Icon name="ios-glasses" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:medicalinformation")}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 13 }} note>
                    {t("more:commingsoon")}
                  </Text>
                </Right>
              </ListItem>
              { authStore.user ? (authStore.user.username == "admin" ?
              <ListItem
                onPress={() => this.props.navigation.navigate("Notification")}
              >
                <Left>
                  <Icon name="home" large style={{ color: "#00bfff" }} />
                  <Text>{t("more:notification")}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
                </Right>
              </ListItem> : <Text />
               ) : <Text />}
            </List>
          </TouchableHighlight>
        </View>
      );
    // } else {
    //   return (
    //     <View style={{ flex: 1, backgroundColor: "white" }}>
    //     <ScrollView>
    //       <TouchableHighlight>
    //         <List>
    //         { authStore.isAuthenticated ?
    //         <ListItem
    //             onPress={() =>
    //               this.props.navigation.navigate("FavouriteDoctor")
    //             }
    //           >
    //             <Left>
    //               <Icon
    //                 name="arrow-forward"
    //                 large
    //                 style={{ color: "#00bfff" }}
    //               />
    //             </Left>
    //             <Right>
    //               <Icon name="md-contact" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:favouritedoctor")}</Text>
    //             </Right>
    //           </ListItem> : 
    //           <Text />
    //           }
    //           { authStore.isAuthenticated ?
    //         <ListItem
    //             onPress={() =>
    //               this.props.navigation.navigate("BookSuccess")
    //             }
    //           >
    //             <Left>
    //               <Icon
    //                 name="arrow-forward"
    //                 large
    //                 style={{ color: "#00bfff" }}
    //               />
    //             </Left>
    //             <Right>
    //               <Icon name="book" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:booksuccess")}</Text>
    //             </Right>                
    //           </ListItem> : 
    //           <Text />
    //           }
    //           {isDoctor ? (
                
    //             <ListItem
    //               onPress={() =>
    //                 this.props.navigation.navigate("AppointmentManage")
    //               }
    //             >
    //               <Left>
    //                 <Icon
    //                   name="arrow-forward"
    //                   large
    //                   style={{ color: "#00bfff" }}
    //                 />
    //               </Left>
    //               <Right>
    //                 <Icon name="clock" large style={{ color: "#00bfff" }} />
    //                 <Text>{t("more:appointmentmanage")}</Text>
    //               </Right>
    //             </ListItem>
    //           ) : (
    //             <Text />
    //           )}
    //           <ListItem
    //             onPress={() => this.props.navigation.navigate("Settings")}
    //           >
    //             <Left>
    //               <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
    //             </Left>
    //             <Right>
    //               <Icon name="md-settings" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:settings")}</Text>
    //             </Right>
                
    //           </ListItem>
  
    //           <ListItem>
    //             <Left>
    //               <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
    //             </Left>
    //             <Right>
    //               <Icon name="ios-call" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:contactus")}</Text>
    //             </Right>
                
    //           </ListItem>
    //           <ListItem>
    //             <Left>
    //               <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
    //             </Left>
    //             <Right>
    //               <Icon name="md-bulb" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:aboutus")}</Text>
    //             </Right>
                
    //           </ListItem>
    //           { authStore.isAuthenticated ?
    //               <ListItem 
    //                 onPress={() => {
    //                 authStore.logoutUser(),
    //                   alert("You logged out"),
    //                   this.props.navigation.navigate("FirstPage");
    //               }}
    //         >
    //               <Left>
    //                 <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
    //               </Left>
    //               <Right>
    //                 <Icon name="log-out" large style={{ color: "#00bfff" }} />
    //                 <Text>{t("more:logout")}</Text>
    //               </Right>
                  
    //             </ListItem> : 
    //             <Text></Text>
    //           }
              
    //           <ListItem>
    //             <Left>
    //               <Text style={{ fontSize: 13 }} note>
    //                 {t("more:commingsoon")}
    //               </Text>
    //             </Left>
    //             <Right>
    //               <Icon name="ios-glasses" large style={{ color: "#00bfff" }} />
    //               <Text>{t("more:medicalinformation")}</Text>
    //             </Right>
                
    //           </ListItem>
    //           {authStore.user ? (authStore.user.username == "admin" ?
    //           <ListItem
    //             onPress={() => this.props.navigation.navigate("Notification")}
    //           >
    //             <Left>
    //               <Icon name="arrow-forward" large style={{ color: "#00bfff" }} />
    //             </Left>
    //             <Right>
    //               <Icon name="home" style={{ color: "#00bfff" }} />
    //               <Text>{t("more:notification")}</Text>
    //             </Right>
                
    //           </ListItem> : <Text />
    //           ) : <Text />}
    //         </List>
    //       </TouchableHighlight>
    //       </ScrollView>
    //     </View>
    //   );
    // }
  }
}

export default withNamespaces(["more", "common"], { wait: true })(
  observer(More)
);

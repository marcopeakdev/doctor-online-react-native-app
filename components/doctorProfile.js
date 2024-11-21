import React, { Component } from "react";
import { observer } from "mobx-react";
import { MapView } from "expo";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  CustomIcon,
  Icon,
  View,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Left,
  Footer
  // Swiper
} from "native-base";
// import SwiperFlatList from 'react-native-swiper-flatlist';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  Image,
  AppRegistry,
  ScrollView,
  WebView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal
} from "react-native";
import Store from "../stores/store";
import authStore from "../stores/authStore";
import { scrollViewHorizontal } from "react-native-gesture-handler";
import { withNamespaces } from "react-i18next";
import Swiper from "react-native-swiper";

const deviceWidth = Dimensions.get("window").width;

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("other:doctorprofile"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  state = {
    modalVisible: false
  };

  selectedURL = { uri: "" };
  likeSwitch = false;
  HeaderMaxHeight = 100;
  HeaderMinHeight = 40;
  ProfileImageMaxHeight = 100;
  ProfileImageMinHeight = 80;
  HalfProfileImageMaxHeight = this.ProfileImageMaxHeight / 2;

  likeButton(id) {
    if (!authStore.isAuthenticated) {
      Alert.alert(
        this.props.t("more:notification"),
        this.props.t("other:pleaselogin")
      );
      return;
    }
    if (Store.Like === false) {
      Store.addToLikeList(id); // console.log(Store.LikeList.length);
      Store.Like = true;
    } else {
      Store.removeFromLikeList(id);
      Store.Like = false;
    }
  }

  chnageHeart(id, t) {
    const emptyHeart = (
      <Icon name="ios-heart-outline" style={{ color: "red" }} />
    );
    const fullHeart = <Icon name="ios-heart" style={{ color: "red" }} />;

    if (Store.Like === true) {
      return fullHeart;
    } else {
      // Store.addToLikeList(id);
      // console.log(Store.LikeList);
      return emptyHeart;
    }
  }

  showMapView(url) {
    if (url == "http://googlemap.com") {
      url = "https://www.google.com/maps/";
    }
    this.setState({ modalVisible: true });
    this.selectedURL = { uri: url };
    console.log(this.selectedURL);
  }

  getDayVal(val) {
    return new Date(new Date().getTime() + val * 86400 * 1000).getDate();
  }

  getMonthVal(val) {
    return new Date(new Date().getTime() + val * 86400 * 1000).getMonth() + 1;
  }

  render() {
    const { t, i18n, navigation } = this.props;

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const profileID = this.props.navigation.getParam("cat");
    const profile = Store.bringToProfile(profileID);
    const value = Store.StarRating();
    const filledStars = value - (value % 1);
    const halfStar = value % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
    const size = 25; // const color = Theme.palette.primary;

    const to = (index: number): number[] => {
      const numbers: number[] = [];
      for (let i = 0; i < index; i += 1) {
        numbers.push(i);
      }
      return numbers;
    };
    if (!profile) {
      return <View />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Grid
          style={{
            backgroundColor: "white",
            position: "relative",
            flex: 1,
            zIndex: 1
          }}
        >
          <Row
            size={1.5}
            style={{
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "white",
                zIndex: 2,
                height: this.HeaderMaxHeight
              }}
            />
          </Row>
          {Platform.OS == "android" ? (
            <View
              style={{
                height: 120,
                width: 120,
                borderColor: "white",
                marginTop:
                  this.HeaderMaxHeight - this.HalfProfileImageMaxHeight,
                marginLeft: "29%",
                borderRadius: 100,
                position: "absolute",
                top: -45,
                zIndex: 20
              }}
            >
              <Thumbnail
                style={styles.thumbnailStyle}
                large
                source={{ uri: profile.img }}
              />
            </View>
          ) : (
            <View
              style={{
                height: this.ProfileImageMaxHeight,
                width: this.ProfileImageMinHeight,
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 3,
                marginTop:
                  this.HeaderMaxHeight - this.HalfProfileImageMaxHeight,
                marginLeft: "35%",
                position: "absolute",
                top: -75,
                zIndex: 20
              }}
            >
              <Thumbnail
                style={styles.thumbnailiosStyle}
                large
                source={{ uri: profile.img }}
              />
            </View>
          )}
          <Row
            size={Platform.OS == "android" ? 3.75 : 8.75}
            style={{
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                borderColor: "#CCCCCC",
                position: "relative",
                zIndex: 2,
                borderWidth: 0.5,
                backgroundColor: "white",
                width: "97%",
                margin: "1.75%",
                shadowColor: "rgba(0,0,0,0.9)",
                shadowRadius: 4,
                top: -1,
                shadowOpacity: 0.3,
                shadowOffset: {
                  height: 4,
                  width: 0
                }
              }}
            >
              <Button transparent onPress={() => this.likeButton(profile.id)}>
                {this.chnageHeart()}
              </Button>

              <Text style={styles.userViewsText}>
                {t("other:views")} {profile.viewers}
              </Text>

              <View
                style={{
                  top: -20,
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                {to(filledStars).map(key => (
                  <Icon
                    name="ios-star"
                    style={{ color: "#FFD700" }}
                    {...{ key, size }}
                  />
                ))}

                {halfStar && (
                  <Icon
                    name="ios-star-half"
                    style={{ color: "#FFD700" }}
                    {...{ size }}
                  />
                )}

                {to(emptyStars).map(key => (
                  <Icon
                    name="ios-star-outline"
                    style={{ color: "#FFD700" }}
                    {...{
                      key,
                      size
                    }}
                  />
                ))}
              </View>

              <View
                style={{
                  top: -20,
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={[styles.visitorsText]}>
                  {t("other:from")} {profile.rating_set.length}{" "}
                  {t("other:visitors")}
                </Text>

                <Text style={[styles.doctorName]}>
                  {t("other:doctor")}: {profile.user.first_name}{" "}
                  {profile.user.last_name}
                </Text>
              </View>

              <View
                style={{
                  top: -20,
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <Text style={[styles.doctordesc1]}>{profile.description}</Text>
              </View>
            </View>
          </Row>

          <Row
            size={Platform.OS == "android" ? 3.75 : 8.75}
            style={{
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                borderColor: "#CCCCCC",
                zIndex: 2,
                borderWidth: 0.5,
                backgroundColor: "white",
                width: "97%",
                margin: "1.75%",
                shadowColor: "rgba(0,0,0,0.9)",
                shadowRadius: 4,
                shadowOpacity: 0.3,
                shadowOffset: {
                  height: 4,
                  width: 0
                }
              }}
            >
              <Left>
                <Icon
                  type="EvilIcons"
                  name="location"
                  style={styles.locationIcon}
                >
                  <Text
                    style={styles.locationText}
                    onPress={() => {
                      this.showMapView(profile.google_maps);
                      // if (Platform.OS == 'ios')
                      //   LinkingIOS.openURL(profile.google_maps);
                      // else
                      //   LinkingIOS.openURL(profile.google_maps);
                    }}
                  >
                    {t("other:googlemaps")}
                  </Text>
                </Icon>
              </Left>
              {/* <MapView
                  style={{ flex: 1,height:250 }}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                /> */}
              {/* <WebView
                  source={{uri: "https://goo.gl/maps/12XLqheJxoB2"}}
                  style={{marginTop: 20, height: 100}}
                /> */}
              <Text style={styles.BookingnowStyle}>
                {" "}
                {t("other:bookdescription")}
              </Text>

              <Swiper
                Style={{ width: deviceWidth, height: "100%" }}
                showsButtons={true}
              >
                <View style={styles.slide1}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      paddingHorizontal: 6
                    }}
                  >
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(0),
                          month: this.getMonthVal(0)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {t("other:today")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(1),
                          month: this.getMonthVal(1)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {t("other:tomorrow")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(2),
                          month: this.getMonthVal(2)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14, textAlign: "center" }
                          ]}
                        >
                          {this.getDayVal(2)}/{this.getMonthVal(2)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.slide1}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      paddingHorizontal: 6
                    }}
                  >
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(3),
                          month: this.getMonthVal(3)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {this.getDayVal(3)}/{this.getMonthVal(3)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(4),
                          month: this.getMonthVal(4)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {this.getDayVal(4)}/{this.getMonthVal(4)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(5),
                          month: this.getMonthVal(5)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14, textAlign: "center" }
                          ]}
                        >
                          {this.getDayVal(5)}/{this.getMonthVal(5)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.slide1}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      paddingHorizontal: 6
                    }}
                  >
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(6),
                          month: this.getMonthVal(6)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {this.getDayVal(6)}/{this.getMonthVal(6)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(7),
                          month: this.getMonthVal(7)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14 }
                          ]}
                        >
                          {this.getDayVal(7)}/{this.getMonthVal(7)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      warning
                      style={styles.bookingButton}
                      onPress={() =>
                        this.props.navigation.navigate("TimeDatePicker", {
                          cat: profile.id,
                          store: Store,
                          day: this.getDayVal(8),
                          month: this.getMonthVal(8)
                        })
                      }
                    >
                      <View style={styles.cardHeader}>
                        <Text
                          style={[
                            styles.buttonText,
                            { color: "#fff", fontSize: 14, textAlign: "center" }
                          ]}
                        >
                          {this.getDayVal(8)}/{this.getMonthVal(8)}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Swiper>
            </View>
          </Row>

          <Row
            size={Platform.OS == "android" ? 2 : 5}
            style={{
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                borderColor: "#CCCCCC",
                zIndex: 2,
                backgroundColor: "white",
                borderWidth: 0.5,
                width: "97%",
                margin: "1.75%",
                shadowColor: "rgba(0,0,0,0.9)",
                shadowRadius: 4,
                shadowOpacity: 0.3,
                shadowOffset: {
                  height: 4,
                  width: 0
                }
              }}
            >
              <Row size={1}>
                <Left>
                  <Icon type="Feather" name="clock" style={styles.clockIcon}>
                    <Text style={styles.thirdText}>
                      {t("other:waitingtime")}: {profile.waiting_time}
                    </Text>
                  </Icon>
                </Left>
                <Right>
                  <Icon type="Feather" name="clock" style={styles.clockIcon}>
                    <Text style={styles.thirdText}>
                      {t("other:fees")}: {profile.fees} {" K.D "}
                    </Text>
                  </Icon>
                </Right>
              </Row>
            </View>
          </Row>
        </Grid>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View>
            <Button
              style={{ alignSelf: "flex-end" }}
              transparent
              onPress={() => {
                this.setState({ modalVisible: false });
              }}
            >
              <Icon name="md-close" />
            </Button>
          </View>

          <WebView
            source={this.selectedURL}
            style={{ marginTop: 10, width: "100%", height: "100%" }}
          />
        </Modal>
      </View>
    );
  }
}

export default withNamespaces(["other", "common"], { wait: true })(
  observer(DoctorProfile)
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    height: 100,
    width: "20%"
  },
  cardHeader: {
    backgroundColor: "#ff7000",
    flex: 1,
    borderRadius: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  buttonText: {
    fontSize: 11
  },
  // wrapper: {
  //   marginTop: 80
  // },
  // slide1: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#9DD6EB"
  // },
  // slide2: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#97CAE5"
  // },
  // slide3: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#92BBD9"
  // },
  // text: {
  //   color: "#000",
  //   fontSize: 20,
  //   fontWeight: "bold"
  // },
  thumbnailStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center", // width: 40, // height: 40,
    position: "absolute",
    width: 80,
    height: 80,
    marginTop: 25
  },
  thumbnailiosStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center", // width: 40, // height: 40,
    position: "absolute",
    width: 80,
    height: 80,
    marginTop: 25
  },
  userViewsText: {
    fontFamily: "GTWalsheim-Medium",
    fontSize: 10,
    color: "#919191",
    paddingTop: 5
  },
  // iconsStyle: {
  //   width: 28,
  //   height: 28,
  //   justifyContent: "flex-start"
  // },
  visitorsText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "GTWalsheim-Medium",
    fontSize: 12,
    color: "#919191"
  },
  // textContainer: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center"
  // },
  // startStyle: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center"
  // },
  doctorName: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "GTWalsheim-Medium",
    fontSize: 15,
    color: "#605F5F"
  },
  doctordesc1: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "GTWalsheim-Medium",
    fontSize: 13,
    color: "#919191"
  },
  locationIcon: {
    color: "#48C1F6",
    paddingTop: 15
  },
  locationText: {
    //         alignSelf: 'center',
    //         alignContent: 'center',
    //         justifyContent: 'center',
    fontFamily: "GTWalsheim-Medium",
    fontSize: 15,
    color: "#605F5F"
  },
  BookingnowStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "GTWalsheim-Black",
    fontSize: 15,
    color: "#919191",
    fontWeight: "bold"
  },
  bookingButton: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
    margin: 13,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    height: 35
  },
  // ymenysarButtons: {
  //   color: "#48C1F6"
  // },
  thirdText: {
    fontSize: 16,
    fontFamily: "GTWalsheim-Medium",
    color: "#919191"
  },
  // locationIcon: {
  //   color: "#48C1F6",
  //   fontSize: 38
  // },
  // cardStyle: {
  //   shadowColor: "rgba(0,0,0,0.7)",
  //   shadowRadius: 4,
  //   shadowOpacity: 0.7,
  //   shadowOffset: {
  //     height: 2,
  //     width: 0
  //   }
  // },
  clockIcon: {
    color: "#48C1F6",
    fontSize: 30
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

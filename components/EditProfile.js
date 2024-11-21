import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  InputText,
  CustomIcon,
  Icon,
  View,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Left,
  Input,
  Footer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  AppRegistry
} from "react-native";
import Store from "../stores/store";
import { ScrollView, scrollViewHorizontal } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import { withNamespaces } from "react-i18next";

class EditProfile extends Component {
  static navigationOptions = {
    title: "Edit Profile",
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  };

  HeaderMaxHeight = 40;
  HeaderMinHeight = 40;
  ProfileImageMaxHeight = 40;
  ProfileImageMinHeight = 30;
  HalfProfileImageMaxHeight = this.ProfileImageMaxHeight / 2;

  componentDidMount() {
    let profileID = this.props.navigation.getParam("cat");
    Store.bringToProfile(profileID);
    let firstName = this.props.navigation.getParam("firstName");
    let lastName = this.props.navigation.getParam("lastName");
  }

  render() {
    const { t, i18n, navigation } = this.props;

    const name1 = this.props.navigation.getParam("firstName");
    // const name = Store.doctorProfile.user;
    // const { votes, value } = this.props;
    const value = 3;
    const votes = 3;
    const filledStars = value - (value % 1);
    const halfStar = value % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
    const size = 25;

    // const color = Theme.palette.primary;

    const to = (index: number): number[] => {
      const numbers: number[] = [];
      for (let i = 0; i < index; i += 1) {
        numbers.push(i);
      }
      return numbers;
    };
    if (!Store.doctorProfile) {
      return <View />;
    }
    const ID = Store.doctorProfile.id;
    // console.log(Store.doctorProfile.rating_set);
    // const A = Store.StarRating(ID);

    return (
      <Grid
        style={{
          backgroundColor: "white",
          position: "relative",
          zIndex: 1
        }}
      >
        <Row size={0.75}>
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
        {/* {Store.StarRatingDoctorSearch(Store.doctorProfile.id)} */}
        <Row size={3}>
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
              shadowOpacity: 0.3,
              shadowOffset: {
                height: 4,
                width: 0
              }
            }}
          >
            <View
              style={{
                height: this.ProfileImageMaxHeight,
                width: this.ProfileImageMinHeight,
                borderRadius: this.ProfileImageMaxHeight / 2,
                borderColor: "white",
                borderWidth: 3,
                marginTop:
                  this.HeaderMaxHeight - this.HalfProfileImageMaxHeight,
                marginLeft: "45%",
                position: "relative",
                top: -75,

                zIndex: 20
              }}
            >
              <Thumbnail
                style={styles.thumbnailStyle}
                large
                source={{ uri: Store.doctorProfile.img }}
              />
            </View>
            <View style={styles.thumbnailStyle}>
              <Text style={[styles.doctorName]}>Doctor:</Text>
              <Button onPress={() => Store.EditProfile(Store.doctorProfile.id)}>
                <Text>confirm</Text>
              </Button>
              <Button
                transparent
                style={{ borderWidth: 1, borderColor: "gray", width: 300 }}
              >
                <InputText
                  style={{ fontFamily: "GTWalsheim-Medium", fontSize: 20 }}
                  placeholder="First Name"
                  autoCapitalize="none"
                  onChangeText={username => this.setState({ username })}
                />
              </Button>
              <Button
                transparent
                style={{ borderWidth: 1, borderColor: "gray" }}
              >
                <InputText
                  style={{ fontFamily: "GTWalsheim-Medium", fontSize: 20 }}
                  placeholder="Last Name"
                  autoCapitalize="none"
                  onChangeText={username => this.setState({ username })}
                />
              </Button>
              <Button
                transparent
                style={{ borderWidth: 1, borderColor: "gray", height: 130 }}
              >
                <InputText
                  style={{ fontFamily: "GTWalsheim-Medium", fontSize: 20 }}
                  placeholder="Description"
                  autoCapitalize="none"
                  onChangeText={username => this.setState({ username })}
                />
              </Button>
            </View>
          </View>
        </Row>
        <Row size={3.5}>
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
            <Icon type="EvilIcons" name="location" style={styles.locationIcon}>
              <Text
                style={styles.locationText}
                onPress={() =>
                  LinkingIOS.openURL(Store.doctorProfile.google_maps)
                }
              >
                google maps
              </Text>
            </Icon>
            <Text style={styles.BookingnowStyle}>
              Book now and you will recieve full address details and clinic
              number
            </Text>
            <Swiper style={styles.wrapper} showsButtons={true}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Today</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Tommorow</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>After Tommorow</Text>
                </Button>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Today</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Tommorow</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>After Tommorow</Text>
                </Button>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Today</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Tommorow</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>After Tommorow</Text>
                </Button>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Today</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>Tommorow</Text>
                </Button>
                <Button rounded warning style={styles.bookingButton}>
                  <Text style={styles.buttonText}>After Tommorow</Text>
                </Button>
              </View>
            </Swiper>
          </View>
        </Row>
        <Row size={1.25}>
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
            <Row>
              <Col style={{ marginTop: 20 }}>
                <Icon
                  type="EvilIcons"
                  name="location"
                  style={styles.locationIcon}
                >
                  <Button transparent rounded style={{ width: 50 }}>
                    <InputText
                      style={{
                        fontFamily: "GTWalsheim-Medium",
                        fontSize: 15,
                        borderWidth: 1
                      }}
                      placeholder="Fees"
                      autoCapitalize="none"
                      onChangeText={username => this.setState({ username })}
                    />
                  </Button>
                  {/* <Text style={styles.thirdText}>Fees: {Store.doctorProfile.fees} KD</Text> */}
                </Icon>
              </Col>
              <Col style={{ marginTop: 20 }}>
                <Right>
                  <Icon type="Feather" name="clock" style={styles.clockIcon}>
                    <Button transparent rounded style={{ width: 110 }}>
                      <InputText
                        style={{
                          fontFamily: "GTWalsheim-Medium",
                          fontSize: 15,
                          borderWidth: 1,
                          width: 100
                        }}
                        placeholder="Waiting Time"
                        autoCapitalize="none"
                        onChangeText={username => this.setState({ username })}
                      />
                    </Button>
                    {/* <Text style={styles.thirdText}>
											Waiting Time: {Store.doctorProfile.waiting_time}
										</Text> */}
                  </Icon>
                </Right>
              </Col>
            </Row>
          </View>
        </Row>
      </Grid>
    );
  }
}

// export default observer(EditProfile);
export default withNamespaces(["other", "common"], { wait: true })(EditProfile);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80
  },
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
    justifyContent: "center",
    // width: 40,
    // height: 40,
    position: "absolute"
  },
  // userViewsText: {
  //   fontFamily: "GTWalsheim-Medium",
  //   fontSize: 10,
  //   color: "#919191",
  //   paddingTop: 5
  // },
  // iconsStyle: {
  //   width: 28,
  //   height: 28,
  //   justifyContent: "flex-start"
  // },
  // visitorsText: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontFamily: "GTWalsheim-Medium",
  //   fontSize: 12,
  //   color: "#919191"
  // },
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
  // doctordesc1: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontFamily: "GTWalsheim-Medium",
  //   fontSize: 13,
  //   color: "#919191"
  // },
  locationIcon: {
    color: "#48C1F6",
    paddingTop: 15
  },
  locationText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
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
    width: "25%",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 5
  },
  // ymenysarButtons: {
  //   color: "#48C1F6"
  // },
  // thirdText: {
  //   fontSize: 16,
  //   fontFamily: "GTWalsheim-Medium",
  //   color: "#919191"
  // },
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
  }
});

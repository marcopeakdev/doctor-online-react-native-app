import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../stores/store";
import { Theme } from "./Theme";
import {
  Content,
  Button,
  Text,
  Icon,
  View,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Spinner,
  Right,
  Input,
  Left
} from "native-base";
// import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { withNamespaces } from "react-i18next";

class DoctorList extends Component {
  goTo() {
    alert("This is a button!");
    // this.props.navigation.navigate("DoctorProfile")
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("other:chooseyourdoctor"),
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#00bfff"
    }
    // headerRight: (
    //   <Button
    //     onPress={() => this.goTo()}
    //     // alert("This is a button!")}
    //     style={{ backgroundColor: "#00bfff", height: 35 }}
    //   >
    //     <Image
    //       large
    //       source={require("../assets/filter.png")}
    //       style={{ height: 25, width: 25, marginRight: 10 }}
    //     />
    //   </Button>
    // )
  });

  componentDidMount() {
    const profileID = this.props.navigation.getParam("SpeId");
    Store.bringAreaAndSpe(profileID);
  }

  render() {
    const { t, i18n, navigation } = this.props;

    const to = (index: number): number[] => {
      const numbers: number[] = [];
      for (let i = 0; i < index; i += 1) {
        numbers.push(i);
      }
      return numbers;
    };

    if (!Store.DoctorAreaAndSpe)
      return (
        <View>
          <Spinner color="red" />
        </View>
      );

    let listOfDoctors = Store.DoctorAreaAndSpe.map(list => {
      const value = Store.StarRatingDoctorSearch(list.id);
      const filledStars = value - (value % 1);
      const halfStar = value % 1 !== 0;
      const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
      const size = 25;
      const color = Theme.palette.primary;
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("DoctorProfile", {
              cat: list.id,
              store: Store
            })
          }
          key={list.id}
        >
          <Card style={{ alignSelf: "center", width: 400 }}>
            <Content>
              <CardItem>
                <Body>
                  <Thumbnail
                    style={styles.thumbnailStyle}
                    large
                    source={{ uri: list.img }}
                  />
                  <Text style={styles.firstText}>
                    {t("other:doctor")} {list.user.first_name}{" "}
                    {list.user.last_name}
                  </Text>
                  <Text note style={styles.secondText}>
                    {list.description}{" "}
                  </Text>
                </Body>
              </CardItem>
              <CardItem style={styles.bookingButtonCardItem}>
                <Image
                  style={styles.locationIcon}
                  source={require("../assets/locationIcon.png")}
                />
                <Text note style={styles.thirdText}>
                  {" "}
                  {t("other:block")}:{list.block} {t("other:street")}:
                  {list.street} {t("other:building")}:{list.building}{" "}
                  {t("other:floor")}:{list.floor}{" "}
                </Text>
              </CardItem>
              <CardItem style={styles.bookingButtonCardItem}>
                <Image
                  source={require("../assets/doctorTool.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text note style={styles.thirdText}>
                  {t("other:profession")}: {list.profession}{" "}
                </Text>
              </CardItem>
              <CardItem style={styles.bookingButtonCardItem}>
                <Image
                  source={require("../assets/money.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text note style={styles.thirdText}>
                  {t("other:fees")}: {list.fees}{" K.D "}
                </Text>
              </CardItem>
              <CardItem style={styles.bookingButtonCardItem}>
                <Image
                  source={require("../assets/clock.png")}
                  style={{ height: 20, width: 20 }}
                />
                <Text note style={styles.thirdText}>
                  {t("other:waitingtime")}: {list.waiting_time}{" "}
                </Text>
              </CardItem>
              <View
                style={{
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
                    {...{ key, size, color }}
                  />
                ))}
                {halfStar && (
                  <Icon
                    name="star-half"
                    style={{ color: "#FFD700" }}
                    {...{ size }}
                  />
                )}
                {to(emptyStars).map(key => (
                  <Icon
                    name="ios-star-outline"
                    style={{ color: "#FFD700" }}
                    {...{ key, size, color }}
                  />
                ))}
                <Text
                  onPress={() =>
                    this.props.navigation.navigate("RatingPage", {
                      id: list.id,
                      Store: Store
                    })
                  }
                  style={styles.text}
                >
                  {list.rating_set.length} {t("other:votes")}
                </Text>
              </View>
              <CardItem style={styles.bookingButtonCardItem}>
                <Button
                  full
                  warning
                  rounded
                  style={styles.bookingButton}
                  onPress={() =>
                    this.props.navigation.navigate("DoctorProfile", {
                      cat: list.id
                      // store: Store
                    })
                  }
                >
                  <Text style={styles.buttonText}>{t("other:book")} </Text>
                </Button>
              </CardItem>
            </Content>
          </Card>
        </TouchableHighlight>
      );
    });

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ flex: 13 }}>
          <ScrollView>{listOfDoctors}</ScrollView>
        </View>
      </View>
    );
  }
}

// export default observer(DoctorList);
export default withNamespaces(["other", "common"], { wait: true })(
  observer(DoctorList)
);

const styles = StyleSheet.create({
  thumbnailStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  firstText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    fontFamily: "GTWalsheim-Medium",
    color: "#54BEED"
  },
  secondText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 22,
    fontFamily: "GTWalsheim-Medium",
    color: "#919191"
  },
  thirdText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: "GTWalsheim-Medium",
    color: "#919191"
  },
  locationIcon: {
    height: 20,
    width: 20
  },
  // fourthText: {
  //   fontSize: 16,
  //   fontFamily: "GTWalsheim-Medium",
  //   color: "#919191",
  //   paddingLeft: 5
  // },
  // iconsStyle: {
  //   width: 28,
  //   height: 28
  // },
  bookingButtonCardItem: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  bookingButton: {
    height: 30,
    width: 140,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  buttonText: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 14,
    fontFamily: "GTWalsheim-Medium"
  }
});

// if (!Store.doctorList) return <View />;
//     const listOfDoctors = Store.doctorList.map(list => (
//       <TouchableHighlight
//         onPress={() =>
//           this.props.navigation.navigate("Products", {
//             cat: list.id,
//             store: Store
//           })
//         }
//         key={list.id}
//       >
//         <Card>
//           <CardItem>
//             <Left>
//               <Thumbnail source={{ uri: list.doctor_img }} />
//               <Body>
//                 <Text>{list.name}</Text>
//                 <Text note>the best {list.name} you will find here </Text>
//               </Body>
//             </Left>
//           </CardItem>
//           <CardItem cardBody>
//             <Image
//               source={{ uri: list.doctor_img }}
//               style={{ height: 200, width: null, flex: 1 }}
//             />
//           </CardItem>
//           <CardItem />
//         </Card>
//       </TouchableHighlight>
//     ));

// return (
//   <Grid>
//     <Row size={1} style={{ backgroundColor: "purple" }} />

//     <Row size={5}>
//       <Container>
//         <Content>
//           <Card>
//             <CardItem large style={styles.thumbnailStyle}>
//               <Thumbnail source={require("../images/logo.png")} />
//             </CardItem>
//             <CardItem>
//               <Body>
//                 <Text style={styles.firstText}>Doctor Osama Habib</Text>
//                 <Text style={styles.secondText}>Professor in Dentist</Text>
//                 <Text style={styles.thirdText}>
//                   <Icon
//                     type="EvilIcons"
//                     name="location"
//                     style={styles.locationIcon}
//                   />
//                   Hawally: Al-Hamra Tower
//                 </Text>

//                 <Text style={styles.fourthText}>
//                   <Image
//                     style={styles.iconsStyle}
//                     source={require("../assets/doctorTool.png")}
//                   />
//                   Doctor Audiology and neuorology
//                 </Text>

//                 <Text style={styles.fourthText}>
//                   <Image
//                     style={styles.iconsStyle}
//                     source={require("../assets/clock.png")}
//                   />
//                   Waiting Time: 60 Minutes
//                 </Text>
//                 <Text style={styles.fourthText}>
//                   <Image
//                     style={styles.iconsStyle}
//                     source={require("../assets/money.png")}
//                   />
//                   Fees: 30 KD
//                 </Text>
//               </Body>
//             </CardItem>
//             <CardItem style={styles.bookingButtonCardItem}>
//               <Button rounded warning style={styles.bookingButton}>
//                 <Text style={styles.buttonText}>Book</Text>
//               </Button>
//             </CardItem>
//           </Card>
//         </Content>
//       </Container>
//     </Row>

//     <Row size={3} style={{ backgroundColor: "yellow" }} />

//     <Row size={1} style={{ backgroundColor: "pink" }} />
//   </Grid>
// );

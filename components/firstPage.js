import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  View
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  ImageBackground
} from "react-native";
import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import Store from "../stores/store";
import { withNamespaces } from "react-i18next";

// import Search from '../assets/Search.png';
// import FirstBackground from "../assets"

class FirstPage extends Component {
  static navigationOptions = {
    header: null,
    footerStyle: {
      backgroundColor: "#00bfff"
    }
  };

  render() {
    const { t, i18n, navigation } = this.props;

    return (
      // rgba(153, 204, 255, .6)
      <ImageBackground
        source={require("../assets/doc.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <Grid>
          <Row size={1} />
          <Row size={2.5}>
            <Image
              source={require("../assets/LogoWhite.png")}
              style={styles.ImageStyle}
            />
          </Row>
          <Row size={0.5} style={styles.bookTheBestTextRow}>
            <Text style={styles.bookTheBestText}>{t("first:description")}</Text>
          </Row>
          <Row size={0.5} />
          <Row size={1.5} style={styles.buttonRow}>
            <Button
              rounded
              style={styles.button}
              onPress={() => this.props.navigation.navigate("Area")}
            >
              <Text style={styles.text}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="needle"
                  style={styles.needleIcon}
                />
                {t("first:input1")}
              </Text>
            </Button>
          </Row>
          <Row size={1.5} style={styles.buttonRow}>
            <Button
              rounded
              style={styles.button}
              onPress={() => this.props.navigation.navigate("SearchByDoctor")}
            >
              <Text style={styles.text}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="magnify"
                  style={styles.needleIcon}
                />
                {t("first:input2")}
              </Text>
            </Button>
          </Row>
          {!authStore.isAuthenticated ? (
            <Row size={2} style={styles.touchableTextRow}>
              <TouchableHighlight>
                {authStore.isAuthenticated ? null : (
                  <Button
                    rounded
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("LoginPage")}
                  >
                    <Text style={[styles.text, { marginTop: 1 }]}>
                      {t("first:login")}
                    </Text>
                  </Button>
                )}
              </TouchableHighlight>
            </Row>
          ) : (
            <Text></Text>
          )}

          {/* <Button rounded style={styles.button}>
            <Text style={styles.text}>
              <Icon
                type="MaterialCommunityIcons"
                name="needle"
                style={styles.needleIcon}
              />
              Choose by Speciality and Area
            </Text>
          </Button>
          <TouchableHighlight style={styles.touchable}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight> */}
        </Grid>
      </ImageBackground>
    );
    // } else {
    //   return (
    //     // rgba(153, 204, 255, .6)
    //     <ImageBackground
    //       source={require("../assets/doc.png")}
    //       style={{ flex: 1, width: "100%", height: "100%" }}
    //     >
    //       <Grid>
    //         <Row size={1} />
    //         <Row size={2.5}>
    //           <Image
    //             source={require("../assets/LogoWhite.png")}
    //             style={styles.ImageStyle}
    //           />
    //         </Row>
    //         <Row size={0.5} style={styles.bookTheBestTextRow}>
    //           <Text style={styles.bookTheBestText}>
    //             {t("first:description")}
    //           </Text>
    //         </Row>
    //         <Row size={0.5} />
    //         <Row size={1.5} style={styles.buttonRow}>
    //           <Button
    //             rounded
    //             style={styles.button}
    //             onPress={() => this.props.navigation.navigate("Area")}
    //           >
    //             <Text style={styles.text}>
    //               <Icon
    //                 type="MaterialCommunityIcons"
    //                 name="needle"
    //                 style={styles.needleIcon}
    //               />
    //               {t("first:input1")}
    //             </Text>
    //           </Button>
    //         </Row>
    //         <Row size={1.5} style={styles.buttonRow}>
    //           <Button
    //             rounded
    //             style={styles.button}
    //             onPress={() => this.props.navigation.navigate("SearchByDoctor")}
    //           >
    //             <Text style={styles.text}>
    //               <Icon
    //                 type="MaterialCommunityIcons"
    //                 name="magnify"
    //                 style={styles.needleIcon}
    //               />
    //               {t("first:input2")}
    //             </Text>
    //           </Button>
    //         </Row>
    //       </Grid>
    //     </ImageBackground>
    //   );
    // }
  }
}

const styles = StyleSheet.create({
  // root: {
  //   backgroundColor: "skyblue",
  //   flex: 1
  // },
  // headerRow: {
  //   backgroundColor: "red"
  // },
  button: {
    // height: "70%",
    // width: '90%',
    shadowColor: "rgba(0,0,0,0.5)",
    shadowRadius: 4,
    shadowOpacity: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  buttonRow: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center"
  },
  ImageStyle: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    // margin: '10%'
    height: "110%",
    width: "100%"
  },
  text: {
    color: "#54BEED",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    marginTop: -5,
    fontFamily: "GTWalsheim-Medium"
  },
  needleIcon: {
    color: "#48C1F6",
    marginTop: 5
  },
  // touchable: {
  //   top: "850%",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   alignSelf: "center",
  //   fontFamily: "GTWalsheim-Medium"
  // },
  // loginText: {
  //   color: "white",
  //   fontFamily: "GTWalsheim-Medium"
  // },
  bookTheBestTextRow: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  },
  bookTheBestText: {
    color: "white",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: {
      height: 2,
      width: 0
    },
    fontFamily: "GTWalsheim-Medium"
  },
  touchableTextRow: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  }
  // loginText: {
  //   color: "black",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   alignSelf: "center",
  //   fontFamily: "GTWalsheim-Medium"
  // }
});
//export default observer(FirstPage);
export default withNamespaces(["first", "common"], { wait: true })(
  observer(FirstPage)
);

import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Body,
  Left
} from "native-base";
import { StyleSheet, TouchableHighlight, Image } from "react-native";
import { withNamespaces } from "react-i18next";

class FooterApp extends Component {
  render() {
    const { t, i18n, navigation } = this.props;

    return (
      <TouchableHighlight>
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("FirstPage")}
            >
              <Image
                source={require("../assets/SearchForFooter.png")}
                style={styles.ImageStyle}
                name={t("other:search")}
              />
              <Text style={styles.TextStyle}>{t("other:search")}</Text>
            </Button>
            <Button vertical>
              <Image
                source={require("../assets/appointment.png")}
                style={styles.ImageStyle}
                name={t("appointment:title")}
              />
              <Text style={styles.TextStyle}>{t("appointment:title")}</Text>
            </Button>
            <Button vertical active>
              <Image
                source={require("../assets/offers.png")}
                style={styles.ImageStyle}
                name={t("offer:title")}
              />
              <Text style={styles.TextStyle}>{t("offer:title")}</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("More")}
            >
              <Icon name="ios-more" />
              <Text style={styles.TextStyle}>{t("more:title")}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </TouchableHighlight>

      /////////////////////////////////////////////////////////////////////////////////

      // <Footer>
      // 	<Row>
      // 		{/* <TouchableHighlight transparent onPress={() => this.props.navigation.navigate('SearchByDoctor')}> */}
      // 		<Col style={styles.inputStyle} >
      // 		<Image source={require("../assets/SearchForFooter.png")} style={styles.ImageStyle} name="Search" />
      // 			<Text style={styles.TextStyle}>Search</Text>
      // 		</Col>
      // 		{/* </TouchableHighlight> */}
      // 		<Col style={styles.inputStyle}>
      // 			<Image source={require("../assets/appointment.png")} style={styles.ImageStyle} name="appointment" />
      // 			<Text style={styles.TextStyle} >Appointment</Text>
      // 		</Col>
      // 		<Col style={styles.inputStyle}>
      // 		<Image source={require("../assets/offers.png")} style={styles.ImageStyle} name="Offers" />
      // 			<Text style={styles.TextStyle}>Offers</Text>
      // 		</Col>
      // 		<Col style={styles.inputStyle}>
      // 		<Image source={require("../assets/settings.png")} style={styles.ImageStyle} name="Settings" />
      // 			<Text style={styles.TextStyle}>Settings</Text>
      // 		</Col>
      // 	</Row>
      // </Footer>
    );
  }
}

//export default FooterApp;
export default withNamespaces(["more", "common"], { wait: true })(FooterApp);

const styles = StyleSheet.create({
  // inputStyle: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center"
  //   // fontSize: 22,
  //   // height: 60,
  //   // fontFamily: 'GTWalsheim-Medium',
  //   // color: '#ffffff',
  //   // backgroundColor: '#00bfff',
  //   // flex: 1
  // },
  ImageStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 22.5,
    height: 22.5
  },
  TextStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "gray",
    fontSize: 12
    // width: 22.5,
    // height: 22.5
  }
  // cardBoxStyle: {
  //   marginLeft: 7,
  //   width: 190,
  //   height: 150,
  //   backgroundColor: "#00bfff"
  // }
});

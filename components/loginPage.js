import React, { Component } from "react";
import { observer } from "mobx-react";
// import Hr from 'react-native-hr-plus';
import authStore from "../stores/authStore";

import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  View,
  Form,
  Item,
  Input
} from "native-base";
import { TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  ImageBackground
} from "react-native";
import { withNamespaces } from "react-i18next";

class LoginPage extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  // componentWillMount(){
  loginButton(username, password) {
    if (!username || !password) {
      alert('Please input Username and Password!');
      return;
    }
    authStore.loginUser(username, password);
    // alert("You Are LoggedIn")
    this.props.navigation.navigate("FirstPage");
  }
  // }
  render() {
    // if (authStore.isAuthenticated) {
    //   this.props.navigation.navigate("FirstPage");
    // }
    const { t, i18n, navigation } = this.props;

    return (
      <ImageBackground
        source={require("../assets/Rectangle.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid>
          <Row size={0.5} style={[styles.Row][{ ImageBackground: "white" }]} />
          <Row size={0.5} style={[styles.Row][{ ImageBackground: "white" }]}>
            <Icon
              name="arrow-back"
              large
              bold
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          </Row>

          <Row size={2.5} style={[styles.Row]}>
            <Image
              source={require("../assets/LogoWhite.png")}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </Row>
          <Row size={1} style={[styles.Row]} />
          {/* <Form> */}
          <Row size={0.65} style={[styles.Row]}>
            <Button rounded transparent style={styles.formBorder}>
              <Icon name="person" />
              <TextInput
                style={i18n.language == 'ar' ? {
                  fontFamily: "GTWalsheim-Medium",
                  fontSize: 20,
                  color: "#fff",
                  width: 200,
                  height: 40,
                  textAlign: 'center'
                } : {
                  fontFamily: "GTWalsheim-Medium",
                  fontSize: 20,
                  color: "#fff",
                  width: 200,
                  height: 40
                }}
                placeholder={t("other:username")}
                autoCapitalize="none"
                onChangeText={username => this.setState({ username })}
              />
            </Button>
          </Row>
          <Row size={0.1} style={[styles.Row]} />
          <Row size={0.65} style={[styles.Row]}>
            <Button rounded transparent style={styles.formBorder}>
              <Icon name="lock" />
              <TextInput
                style={i18n.language == 'ar' ? {
                  fontFamily: "GTWalsheim-Medium",
                  fontSize: 20,
                  color: "#fff",
                  width: 200,
                  height: 40,
                  textAlign: 'center'
                } : {
                  fontFamily: "GTWalsheim-Medium",
                  fontSize: 20,
                  color: "#fff",
                  width: 200,
                  height: 40
                }}
                placeholder={t("other:password")}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </Button>
          </Row>
          <Row size={0.75} />
          <Row size={1} style={[styles.Row]}>
            <Button
              transparent
              style={styles.buttonBorder}
              rounded
              onPress={() => {
                this.loginButton(this.state.username, this.state.password)
              }}
            >
              <Text style={styles.TextStyle}>{t("first:login")}</Text>
            </Button>
          </Row>
          <Row size={0.5} style={[styles.Row]}>
            <Text style={{ color: "white" }}>
              ───────── <Text style={{ color: "white" }}>{t("other:or")}</Text>{" "}
              ─────────
            </Text>
            {/* <Hr /> */}
          </Row>
          {!authStore.isAuthenticated ? (
            <Row size={1.85} style={[styles.Row]}>
              <Button
                rounded
                transparent
                style={[styles.buttonBorder]}
                onPress={() => this.props.navigation.navigate("RegisterPage")}
                // authStore.registerUser(this.state.username, this.state.password)
              >
                <Text style={styles.TextStyle}>{t("other:register")}</Text>
              </Button>
            </Row>
          ) : null}
        </Grid>
      </ImageBackground>
    );
  }
}

//export default observer(LoginPage);
export default withNamespaces(["other", "common"], { wait: true })(LoginPage);

const styles = StyleSheet.create({
  Row: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center"
    // marginTop: '5%'
  },
  TextStyle: {
    // justifyContent: "center",
    // textAlign:"center",
    // textAlignVertical:"center",
    // textAlign: "justify",
    // alignSelf: "center",
    // alignContent: "center",
    // marginLeft: 110,
    fontFamily: "GTWalsheim-Medium",
    fontSize: 20
  },
  buttonBorder: {
    justifyContent: "center",
    width: "75%",
    borderColor: "#fff",
    borderWidth: 3
  },
  // outerCircle: {
  //   borderRadius: 40,
  //   // overflow: 'hidden',
  //   borderColor: "white"
  //   // width: 80,
  //   // height: 80
  // },
  // innerCircle: {
  //   borderRadius: 35,
  //   borderColor: "white",
  //   overflow: "hidden",
  //   color: "white",
  //   width: 70,
  //   height: 70,
  //   margin: 5
  // },
  formBorder: {
    width: "80%",
    height: "100%",
    borderWidth: 3,
    borderColor: "#fff"
  }
});

import React, { Component } from "react";
import { StyleSheet, Text, View, Button, I18nManager as RNI18nManager, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Root, Container, Icon } from "native-base";
import FirstPage from "./components/firstPage";
// import BottomTab from './components/BottomTab';
import BottomStack from "./components/BottomTab";
import LoginPage from "./components/loginPage";
import SearchByDoctor from "./components/SearchByDoctor";
import DoctorList from "./components/doctorList";
import More from "./components/More";
import TimeDatePicker from "./components/TimeDatePicker";
import Settings from "./components/Settings";
import AppointmentManage from "./components/AppointmentManage";
import FavouriteDoctor from "./components/FavouriteDoctor";
import BookSuccess from "./components/BookSuccess";
import Notification from "./components/Notification";
import Schedule from "./components/Schedule";

import { Col, Row, Grid } from "react-native-easy-grid";
import Area from "./components/Area";
import Edit from "./components/Edit";
import anime from "./components/animation";
import anime1 from "./components/animation1";
import FooterApp from "./components/footer";
import SpecialityPage from "./components/specialityPage";
import HomeScreen from "./components/HomeScreen";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import DoctorProfile from "./components/doctorProfile";
import EditProfile from "./components/EditProfile";
import offersPage from "./components/offersPage";
import AppointmentPage from "./components/AppointmentPage";
import Filter from "./components/Filter";
import RegisterPage from "./components/RegisterPage";
import RatingPage from "./components/RatingPage";
import { withNamespaces } from "react-i18next";
import i18n from "./utils/i18n";
let iconName;

const WrappedStack = ({ t }) => <SuperNav screenProps={{ t }} />;
const ReloadAppOnLanguageChange = withNamespaces("common", {
  bindI18n: "languageChanged",
  bindStore: false
})(WrappedStack);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    try {
      await Expo.Font.loadAsync({
        "GTWalsheim-Medium": require("./assets/fonts/GT-Walsheim-Medium.ttf"),
        "GTWalsheim-Black": require("./assets/fonts/GT-Walsheim-Black.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        Arial: require("native-base/Fonts/Roboto.ttf")
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.fontLoaded) {
      // const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';

      // if (i18n.dir().toUpperCase() !== RNDir) {
      //     const isLocaleRTL = i18n.dir().toUpperCase() === 'RTL';

      //     RNI18nManager.forceRTL(isLocaleRTL);

      //     // RN won't set the layout direction if we
      //     // don't restart the app's JavaScript.
      //     Expo.Updates.reloadFromCache();
      // }

      console.log("fonts loaded: ", this.state.fontLoaded);
      return (
        <Container>
          <ReloadAppOnLanguageChange />
          {/* <RelodAppOnLanguageChange  /> */}
        </Container>
      );
    } else {
      return (
        <View>
          <Text>loading</Text>
        </View>
      );
    }
  }
}

const AnimeTab = createStackNavigator(
  {
    anime: anime,
    anime1: {
      screen: anime1,
      navigationOptions: {
        header: null
      },
      hideTabBar: true
    }
  },
  {}
);

const FirstPageTab = createStackNavigator(
  {
    FirstPage: FirstPage,
    SearchByDoctor: SearchByDoctor,
    LoginPage: LoginPage,
    Area: Area,
    SpecialityPage: SpecialityPage,
    DoctorList: DoctorList,
    Edit: Edit,
    DoctorProfile: DoctorProfile,
    TimeDatePicker: {
      screen: TimeDatePicker,
      navigationOptions: {
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#00bfff"
        }
      }
    },
    EditProfile: EditProfile,
    Filter: Filter,
    RegisterPage: RegisterPage,
    RatingPage: RatingPage
  },
  {
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#90d4ed"
      },
      headerTextStyle: {
        fontWeight: "bold"
      },
      hideTabBar: true
    }
  }
);

const MoreTab = createStackNavigator(
  {
    More: More,
    Settings: Settings,
    AppointmentManage: AppointmentManage,
    FavouriteDoctor: FavouriteDoctor,
    BookSuccess: BookSuccess,
    Notification: Notification,
    EditProfile: EditProfile,
    Schedule: Schedule,
    Edit: Edit
  },
  {
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#90d4ed"
      },
      headerTextStyle: {
        fontWeight: "bold"
      },
      hideTabBar: true
    }
  }
);
const AppointmentTab = createStackNavigator(
  {
    AppointmentPage: AppointmentPage
  },
  {}
);
const OffersTab = createStackNavigator(
  {
    offersPage: offersPage
  },
  {}
);

const BottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: FirstPageTab
    },
    Appointment: {
      screen: AppointmentTab
    },
    Offers: {
      screen: OffersTab
    },
    More: {
      screen: MoreTab
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation, screenProps }) => ({
      title:
        navigation.state.routeName === "Home"
          ? screenProps.t("other:home")
          : navigation.state.routeName === "Appointment"
            ? screenProps.t("other:appointment")
            : navigation.state.routeName === "Offers"
              ? screenProps.t("other:offers")
              : screenProps.t("other:more"),
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          iconName = "search";
        } else if (routeName === "Appointment") {
          iconName = "calendar";
        } else if (routeName === "Offers") {
          iconName = "bullhorn";
        } else if (routeName === "More") {
          iconName = "ellipsis-h";
        }
        return (
          <Icon
            name={iconName}
            style={{ color: tintColor }}
            type="FontAwesome"
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "black",
      style: {
        backgroundColor: "#00bfff"
      },
      labelStyle: {
        fontSize: 12
      }
    }
  }
);

const SuperNav = createStackNavigator(
  {
    Anime: AnimeTab,
    //  RatingPage: RatingPage,
    BottomTab: BottomTab
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default App;

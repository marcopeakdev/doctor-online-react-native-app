// import React from 'react';
// import { Icon } from 'native-base';

// import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

// import SpecialityPage from './specialityPage';
// import SearchByDoctor from './SearchByDoctor';
// import LoginPage from './loginPage';
// import FirstPage from './firstPage';

// import RootStack from './StackNavigator';

// import data from '../../icecreamData';

// const HomeTab = createStackNavigator(
// 	{
// 		Speciality: {
// 			screen: SpecialityPage,
// 			navigationOptions: {
// 				header: null
// 			}
// 		},
// 		Search: {
// 			screen: SearchByDoctor
// 		},
// 		Login: LoginPage,
// 		FirstPage: {
// 			screen: FirstPage
// 		}
// 	},
// 	{
// 		initialRouteName: 'FirstPage',

// 		navigationOptions: {
// 			headerTintColor: 'white',
// 			headerStyle: {
// 				backgroundColor: '#90d4ed'
// 			},
// 			headerTextStyle: {
// 				fontWeight: 'bold'
// 			},
// 			hideTabBar: true
// 		}
// 	}
// );

// const ListTab = createStackNavigator(
// 	{
// 		Search: {
// 			screen: SearchByDoctor,
// 			navigationOptions: {
// 				headerTitle: 'IceCream List'
// 			}
// 		},
// 		Login: {
// 			screen: LoginPage
// 		},
// 		FirstPage: {
// 			screen: FirstPage
// 		}
// 	},
// 	{
// 		initialRouteName: 'Search',
// 		navigationOptions: {
// 			headerTintColor: 'white',
// 			headerStyle: {
// 				backgroundColor: '#90d4ed'
// 			},
// 			headerTextStyle: {
// 				fontWeight: 'bold'
// 			}
// 		}
// 	}
// );

// const BottomTab = createBottomTabNavigator(
// 	{
// 		HomeTab: HomeTab,
// 		ListTab: ListTab
// 	},
// 	{
// 		initialRouteName: 'HomeTab',
// 		tabBarOptions: {
// 			activeTintColor: '#6200EE',
// 			inactiveTintColor: '#858585',
// 			style: {
// 				backgroundColor: 'white'
// 			},
// 			labelStyle: {
// 				fontSize: 14
// 			}
// 		}
// 	}
// );

// export default BottomTab;

import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { Button } from "native-base";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const BottomStack = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});

export default BottomStack;

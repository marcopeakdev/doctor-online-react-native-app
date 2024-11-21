import React, { Component } from "react";
import { observer } from "mobx-react";
import Store from "../stores/store";
import { Col, Row, Grid } from "react-native-easy-grid";
// import BottomTab from './BottomTab';
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
// import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableHighlight, ScrollView } from "react-native";

class Area extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("other:chooseyourarea"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  showAreas(id) {
    const sortableList = Store.Area;
    const productInCat = sortableList.filter(item => +item.city === +id);
    const doctorSpeAndPro = productInCat;

    let listOfAreas = doctorSpeAndPro
      .slice()
      .sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .map(area => (
        <ListItem
          key={area.id}
          onPress={() =>
            this.props.navigation.navigate("SpecialityPage", {
              AreaName: area.id,
              store: Store
            })
          }
        >
          <Left>
            <Text>{area.name}</Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      ));
    return listOfAreas;
  }
  render() {
    Store.StarRating();
    if (!Store.city) return <View style={styles.thumbnailStyle} />;

    let listOfcities = Store.city
      .slice()
      .sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .map(list => (
        <TouchableHighlight key={list.id}>
          <List>
            <ListItem itemDivider>
              <Text>{list.name}</Text>
            </ListItem>
            {this.showAreas(list.id)}
          </List>
        </TouchableHighlight>
      ));

    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView style={{ backgroundColor: "white" }}>
          {listOfcities}
        </ScrollView>
      </View>
    );
  }
}

export default observer(Area);

const styles = StyleSheet.create({
  thumbnailStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center"
  }
  // firstText: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 22,
  //   fontFamily: "GTWalsheim-Medium",
  //   color: "#54BEED"
  // },
  // secondText: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 22,
  //   fontFamily: "GTWalsheim-Medium",
  //   color: "#919191"
  // },
  // thirdText: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 16,
  //   fontFamily: "GTWalsheim-Medium",
  //   color: "#919191"
  // },
  // locationIcon: {
  //   color: "#48C1F6"
  // },
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
  // bookingButtonCardItem: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center"
  // },
  // bookingButton: {
  //   height: 30,
  //   width: 140,
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center"
  // },
  // buttonText: {
  //   alignSelf: "center",
  //   alignContent: "center",
  //   justifyContent: "center",
  //   fontSize: 14,
  //   fontFamily: "GTWalsheim-Medium"
  // }
});

// import React, { Component } from 'react';
// import { Container, Header, Content, List, ListItem, Text } from 'native-base';
// export default class ListDividerExample extends Component {
//   render() {
//     return (
// <Container>
//   <Content>
//     <List>
//       <ListItem itemDivider>
//         <Text>A</Text>
//       </ListItem>
//       <ListItem>
//         <Text>Aaron Bennet</Text>
//       </ListItem>
//       <ListItem>
//         <Text>Ali Connors</Text>
//       </ListItem>
//       <ListItem itemDivider>
//         <Text>B</Text>
//       </ListItem>
//       <ListItem>
//         <Text>Bradley Horowitz</Text>
//       </ListItem>
//     </List>
//   </Content>
// </Container>
//     );
//   }
// }

<Icon type="EvilIcons" name="chevron-right" />;

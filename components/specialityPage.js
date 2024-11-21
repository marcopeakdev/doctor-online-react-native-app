import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  View,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Right,
  Item,
  Input,
  Footer
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableHighlight, Image } from "react-native";
import SearchBar from "react-native-search-bar";
import Store from "../stores/store";
import { ScrollView } from "react-native-gesture-handler";
import GridView from "react-native-super-grid";

class SpecialityPage extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("other:speciality"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  componentDidMount() {
    const profileID = this.props.navigation.getParam("AreaName");
    Store.bringToSpeciality(profileID);
  }

  render() {
    if (!Store.Speciality) return <View />;
    // return(
    let spe = (
      <GridView
        style={{ backgroundColor: "white", flex: 1 }}
        itemDimension={150}
        items={Store.Speciality}
        renderItem={item => (
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate("DoctorList", {
                SpeId: item.id,
                store: Store
              })
            }
          >
            <Card style={styles.cardBoxStyle}>
              <Body>
                <Image
                  square
                  source={{ uri: item.img }}
                  style={{
                    marginTop: 15,
                    width: 70,
                    height: 70
                  }}
                />
                <Text style={styles.inputStyle}>{item.name}</Text>
              </Body>
            </Card>
          </TouchableHighlight>
        )}
      />
    );
    // );
    return <View style={{ backgroundColor: "white", flex: 1 }}>{spe}</View>;

    // if (!Store.Speciality) return <View />;
    // let Specialities = Store.filteredSpeciality.map((Speciality, index) => {
    //   if (index % 2 === 0)
    //     return (
    //       <Row key={Speciality.id}>
    //         <Col key={Speciality.id}>
    //           <TouchableHighlight
    //             onPress={() =>
    //               this.props.navigation.navigate("DoctorList", {
    //                 SpeId: Speciality.id,
    //                 store: Store
    //               })
    //             }
    //           >
    //             <Card style={styles.cardBoxStyle}>
    //               <Body>
    //                 <Image
    //                   square
    //                   source={{ uri: Speciality.img }}
    //                   style={{
    //                     marginTop: 15,
    //                     width: 70,
    //                     height: 70
    //                   }}
    //                 />
    //                 <Text style={styles.inputStyle}>{Speciality.name}</Text>
    //               </Body>
    //             </Card>
    //           </TouchableHighlight>
    //         </Col>
    //         {Store.Speciality.length > index + 1 ? (
    //           <Col key={Store.Speciality[index + 1].id}>
    //             <TouchableHighlight
    //               onPress={() =>
    //                 this.props.navigation.navigate("DoctorList", {
    //                   SpeaId: Store.Speciality[index + 1],
    //                   store: Store
    //                 })
    //               }
    //             >
    //               <Card style={styles.cardBoxStyle}>
    //                 <Body>
    //                   <Image
    //                     square
    //                     source={{ uri: Store.Speciality[index + 1].img }}
    //                     style={{
    //                       marginTop: 15,
    //                       width: 70,
    //                       height: 70
    //                     }}
    //                   />
    //                   <Text style={styles.inputStyle}>
    //                     {Store.Speciality[index + 1].name}
    //                   </Text>
    //                 </Body>
    //               </Card>
    //             </TouchableHighlight>
    //           </Col>
    //         ) : null}
    //       </Row>
    //     );
    // });
    // return (
    //   <View style={{ backgroundColor: "white", flex: 1 }}>
    //     <View style={{ flex: 12 }}>
    //       <Item style={{ margin: 10 }}>
    // 				<Icon style={{ margin: 10 }} name="search" />
    // 				<Input placeholder="Search By Products..." style={{color:"skyblue"}}onChangeText={(e) => Store.changeSpecialityValue(e)} />
    // 			</Item>

    //       <ScrollView>{Specialities}</ScrollView>
    //     </View>
    //   </View>
    // );
  }
}

export default observer(SpecialityPage);

const styles = StyleSheet.create({
  inputStyle: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 22,
    height: 60,
    fontFamily: "GTWalsheim-Medium",
    color: "#ffffff",
    backgroundColor: "#00bfff",
    flex: 1
  },
  cardBoxStyle: {
    backgroundColor: "#00bfff"
  }
});

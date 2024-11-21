import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Row,
  View
} from "native-base";
import { StyleSheet, ScrollView } from "react-native";
import Store from "../stores/store";
import { withNamespaces } from "react-i18next";
import authStore from "../stores/authStore";
let doctorlists;

class Schedule extends Component {
  state = {
    doctor_id: ""
  };

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t("book:booked"),
    headerStyle: {
      backgroundColor: "#00bfff"
    }
  });

  componentDidMount() {
    for (let i = 0; i < doctorlists.length; i++) {
      if (authStore.user.username == doctorlists[i].user.username) {
        this.setState({
          doctor_id: doctorlists[i].id
        });
      }
    }
  }

  render() {
    const { t, i18n, navigation } = this.props;

    const { doctor_id } = this.state;

    if (!Store.filteredDoctors) return <View style={styles.thumbnailStyle} />;
    let listOfcities = Store.AppointmentsList;
    doctorlists = Store.doctorList;

    return (
      <View style={styles.container}>
        <ScrollView style={{ marginTop: 2 }}>
          {listOfcities.map(item => (
            <View style={styles.itemView} key={item.id}>
              {doctor_id == item.doctor ? (
                <View style={{ width: "97%", margin: 5, marginVertical: 20 }}>
                  <View style={styles.item}>
                    <Text>{t("book:patientname")}</Text>
                    {item.patient ? (
                      <Text note>{item.patient.username}</Text> )
                      : null
                    }
                    
                  </View>

                  <View style={styles.item}>
                    <Text>{t("book:date")}</Text>
                    <Text note>{item.date}</Text>
                  </View>

                  <View style={styles.item}>
                    <Text>{t("book:reservationtime")}</Text>
                    <Text note>{item.available_time}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default withNamespaces(["book", "common"], { wait: true })(Schedule);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  item: {
    borderColor: "#ddd",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    padding: 4
  },
  thumbnailStyle: {
    alignContent: "center",
    justifyContent: "center"
  },
  itemView: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row"
  }
});

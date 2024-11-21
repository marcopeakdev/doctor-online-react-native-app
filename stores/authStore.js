import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import { AsyncStorage,Alert } from "react-native";
import jwt_decode from "jwt-decode";

import Notification from '../utils/Notification';

// Utils
import setAuthToken from "../utils/setAuthToken";

import Store from "./store";

const BASEURL = "http://207.154.246.97";

const instance = axios.create({
  // baseURL: "http://192.168.100.244:8000/"
  baseURL: BASEURL
});

class authStore {
  constructor() {
    this.user = null;
    this.isLogin = false;
  }

  get isAuthenticated() {
    return !!this.user;
  }

  setCurrentUser(decoded) {
    this.user = decoded;
  }

  logoutUser() {
    AsyncStorage.removeItem("jwtToken").then(
      () => {
        this.user = null;
        this.isLogin = false;
        setAuthToken();
      },
      () => {
        console.log("something went wrong with logging out");
      }
    );
  }

  loginUser(username, password) {
    const userData = {
      username: username,
      password: password
    };
    instance
      .post("login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token).then(
          () => {
            // Set token to Auth header
            setAuthToken(token);
            this.isLogin = true;
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
            this.setDeviceToken(this.user);
            
            Store.getProfileId(this.user.user_id);
            
            Store.getLikeList();
            // this.props.navigation.navigate('FirstPage');
          },
          () => console.log("something went wrong with setting jwt token")
        );
      })
      .then(() => { 
        alert("Welcome" + " " + username);
      })
      .catch(err => console.log(err));
  }

  registerUser(firstname, lastname, username, phonenumber, password) {
    const userData = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: phonenumber,
      password: password
    };
    instance
      .post("register/", userData)
      .then(res => res.response)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token)
          .then(() => {
            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    //   return (
    // this.loginUser(username, password)
    //   )
  }

  checkForToken = () => {
    AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          const currentTime = Date.now() / 1000;

          // Decode token and get user info
          const decoded = jwt_decode(token);

          // Check token expiration
          if (decoded.exp >= currentTime) {
            // Set auth token header
            setAuthToken(token);
            // Set user and isAuthenticated
            this.setCurrentUser(decoded);
          } else {
            this.logoutUser();
            // Redirect to login
          }
        }
      })
      .catch(err => console.error(err));
  };

  setDeviceToken = (user) => {
    Notification.registerForPushNotifications(function() {
      const userData = {
        user: user.user_id,
        token: Notification.token,
        user_email: user.email
      };
      console.log(Notification.token);
      axios
        .put(BASEURL + "/profile/info/get&update/" + userData.user, userData)
        // .put("http://192.168.5.142/profile/info/get&update/" + userData.user, userData)
        .then(res => res.data)
        .then(res => {
          console.log(res);
        });
    });

    
  }
}

decorate(authStore, {
  user: observable,
  isAuthenticated: computed
});

export default new authStore();

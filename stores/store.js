import { decorate, observable, action, computed } from "mobx";
import React, { Component } from "react";
import axios from "axios";
import authStore from "./authStore";
import Notification from "../utils/Notification";
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

const BASEURL = "http://207.154.246.97";

class Store {
  constructor() {
    this.doctorList = [];
    this.ratingSet = [];
    this.filteredDoctors = [];
    this.doctorProfile = null;
    this.DoctorAreaAndSpe = [];
    this.AreaDoctorNoSpeciality = [];
    this.city = [];
    this.cityList = [];
    this.Area = [];
    this.AreaList = [];
    this.filteredCategories = [];
    this.filteredItems = [];
    this.cartList = [];
    this.theQuery = "";
    this.counter = 0;
    this.orderList = [];
    this.totalPrice = 0;
    this.Speciality = [];
    this.filteredSpeciality = [];
    this.RatingList = [];
    this.counter = 3;
    this.Like = false;
    this.LikeList = [];
    this.editProf = [];
    this.offersPics = null;
    this.doctorSettingProfile = null;
    this.AppointmentsList = [];
    this.userPatient = [];
    this.userDoctor = [];
    this.users = [];
    this.fullusers = [];
    this.userName = "";
    this.filterappointment = [];
    this.likeDoctors = [];
    this.goingList = [];
    this.myProfileId = null;
  }

  //for bringing Doctors only
  getDoctors() {
    axios
      // http://207.154.246.97/
      .get(BASEURL + "/doctor/list")
      .then(res => res.data)
      .then(doctors => {
        this.doctorList = doctors;
        this.filteredDoctors = doctors;
        this.AreaDoctorNoSpeciality = doctors;
        this.itemList = doctors.reduce((a, b) => a.concat(b.items), []);
      })
      .catch(err => console.error(err));
  }

  //for bringing Cities only
  getCities() {
    axios
      .get(BASEURL + "/cities/")
      .then(res => res.data)
      .then(cities => {
        this.city = cities;
      })
      .catch(err => console.error(err));
  } //for bringing Area only
  getAreas() {
    axios
      .get(BASEURL + "/area/")
      .then(res => res.data)

      .then(Areas => {
        this.Area = Areas;
      })
      .catch(err => console.error(err));
    console.log(this.Area);
  } //for bringing Speciality only
  getSpeciality() {
    axios
      .get(BASEURL + "/speciality/")
      .then(res => res.data)
      .then(Speciality => {
        this.Speciality = Speciality.slice().sort();
        this.filteredSpeciality = Speciality.sort(); // this.filteredSpeciality;
      })
      .catch(err => console.error(err));
  }

  getRating() {
    axios
      .get(BASEURL + "/rating/")
      .then(res => res.data)
      .then(rates => {
        this.RatingList = rates;
      })
      .catch(err => console.error(err));
  } //for bringing doctor id from doctor list

  bringToProfile(id) {
    const productInCat = this.doctorList.find(item => +item.id === +id);
    this.doctorProfile = productInCat;

    axios
      .post(BASEURL + `/doctor/views/` + id)
      .then(() => console.log("bla bla bla"))
      .catch(err => console.error(err));

    return productInCat;
  }

  EditProfile(state) {
    let doctor = this.findDoctorByUsername(authStore.user.username);
    state.id = doctor.id;
    const userData = state;
    axios
      .put(BASEURL + `/update/profile/` + doctor.id, userData)
      .then(res => res.data)
      .then(() => {
        this.getDoctors();
        alert("Success");
      })
      .catch(() => console.log("You Failed"));
  }

  getEditProfile(id) {
    let doctor = this.findDoctorByUsername(authStore.user.username);
    axios
      .get(BASEURL + `/update/profile/` + doctor.id)
      .then(res => res.data)
      .then(rates => {
        this.editProf = rates;
      })
      .catch(() => console.log("llllllllllllll"));
  } //for bringing area id to the Speciality page to get doctor from this area only

  getProfileId(user_id) {
    if (!user_id) {
      user_id = authStore.user.user_id;
    }
    axios
      .get(BASEURL + `/profile/info/get&update/` + authStore.user.user_id)
      .then(res => res.data)
      .then(data => {
        this.myProfileId = data.id;
        this.getEditProfile(this.myProfileId);
      })
      .catch(() => console.log("llllllllllllll"));
  }
  bringToSpeciality(id) {
    const AreaId = this.doctorList.filter(item => +item.area.id === +id);
    this.AreaDoctorNoSpeciality = AreaId;
    this.DoctorAreaAndSpe = this.AreaDoctorNoSpeciality;
  } //for bringing Speciality id to get doctor from this Speciality only

  bringAreaAndSpe(id) {
    const SpeId = this.AreaDoctorNoSpeciality.filter(
      item => +item.speciality === +id
    );
    this.DoctorAreaAndSpe = SpeId;
  }

  onSearchDoctorChangeHandler(e) {
    const items = this.doctorList.filter(product =>
      product.user.first_name.toLowerCase().includes(e)
    );
    this.filteredDoctors = items;
  }

  changeDoctorValue(e) {
    this.theQuery = e.toLowerCase();
    this.onSearchDoctorChangeHandler(this.theQuery);
  }

  onSearchSpecialityChangeHandler(e) {
    const items = this.Speciality.filter(product =>
      product.name.toLowerCase().includes(e)
    );
    this.filteredSpeciality = items;
  }

  changeSpecialityValue(e) {
    this.theQuery = e.toLowerCase();
    this.onSearchSpecialityChangeHandler(this.theQuery);
  }

  StarRating() {
    if (!this.doctorProfile) {
      return 0;
    } else {
      let ratingSet = this.doctorProfile.rating_set;
      let rates =
        ratingSet.reduce((total, rating) => total + rating.ratings, 0) /
        ratingSet.length;
      if (!rates) {
        rates = 0;
      }
      return rates;
    }
  }

  StarRatingDoctorSearch(id) {
    let DoctorRating = this.doctorList.find(item => +item.id === +id);
    let doctorRating = DoctorRating.rating_set;
    let Rate = 0;
    for (let i in doctorRating) {
      Rate += doctorRating[i].ratings;
    }
    Rate = Rate / doctorRating.length;

    if (!Rate) {
      Rate = 0;
    }
    return Rate;
  }

  addToLikeList(id) {
    
    axios
      .get(BASEURL + `/make/favourite/` + id)
      // .get(`http://192.168.5.142/make/favourite/` + id)
      .then(() => console.log("bla bla bla"))
      .catch(err => console.error(err));
  }

  removeFromLikeList(id) {
    this.addToLikeList(id);
  }

  getLikeList() {
    axios
      .get(BASEURL + `/favourite/`)
      // .get(`http://192.168.5.142/favourite/`)
      .then(res => {
        this.filterLikeList(res.data);
        // return this.filterLikeList(res.data);
      })
      .catch(err => console.error(err));
  }

  filterLikeList(data) {
    let result = [];
    if( data.length > 0 ) {
      let user = {};
      for (var i in data) {
        user = this.findDoctorByDoctorname(data[i].doctor_name);
        if(user) {
          result.push(user);
        }
      }
    }
    this.likeDoctors = result;
  }

  ProfileToEdit(theUser) {
    const productInCat = this.doctorList.find(
      item => item.user.username === theUser
    );
    this.doctorSettingProfile = productInCat;

    return this.doctorSettingProfile;
  }

  postRate(id, ratings, userId) {
    const userData = {
      ratings: ratings,
      doctor: id,
      user: userId
    };

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", userData);

    axios
      .post(BASEURL + `/make/rating/`, userData)
      .then(() => console.log("bla bla bla"))
      .catch(err => console.error(err));
  }

  postBook(date, available_time, id, userId) {
    const bookdata = {
      date: date,
      available_time: available_time,
      doctor: id,
      patient: userId
    };
    console.log("bla 1 2 bookdata", bookdata);
    axios
      .post(BASEURL + `/create/schedeul/`, bookdata)
      .then(response => {
        this.getAppointments();
        if(userId) {
          let token = this.getToken(id);
          Notification.sendPushNotification(token, 'Book Success', 'Sent Notification Successfull to Doctor.');
        }
      })
      .catch(err => console.error(err));
  }

  getToken(id) {
    const user = this.fullusers.find(duser => duser.user_email === this.doctorProfile.user.email);
    if(user)
      return user.token;
  }

  getUsers() {
    axios
      .get(BASEURL + "/users/")
      .then(res => res.data)
      .then(users => {
        this.users = users;
      })
      .catch(err => console.error(err));
  }

  getAllUsersProfile() {
    axios
      .get(BASEURL + "/users/profiles")
      // .get("http://192.168.5.142/users/profiles")
      .then(res => res.data)
      .then(users => {
        this.fullusers = users;
      })
      .catch(err => console.error(err));
  }
  

  getAppointments() {
    axios
      .get(BASEURL + "/doctor/schedeul")
      .then(res => res.data)
      .then(Appointment => {
        this.AppointmentsList = Appointment;
      })
      .catch(err => console.error(err));
  }

  findDoctorInUsers(theUser) {
    const user = this.doctorList.find(item => item.id === theUser);
    this.userDoctor = user;
    return this.userDoctor;
  }

  findDoctorByUsername(username) {
    const user = this.doctorList.find(item => item.user.username === username);
    this.userDoctor = user;
    return this.userDoctor;
  }

  findDoctorByDoctorname(doctorname) {
    const user = this.doctorList.find(item => (item.user.first_name + (item.user.last_name ? ' ' + item.user.last_name : '')) === doctorname);
    return user;
  }

  getDoctorName(doctorid){
    const doctor = this.doctorList.find(item => item.id === doctorid);
    return doctor.user.username;
  }

  findUser(theUser) {
    const user = this.users.find(item => item.username === theUser);
    // console.log(user)
    this.userPatient = user;
    return this.userPatient;
  }

  findSchedule(user) {
    if (!authStore.isAuthenticated) {
      filterappointment = null;
      return;
    }

    let alist = this.AppointmentsList.filter(item => item.patient !== null);

    filterappointment = alist.filter(item => item.patient.username === user);
    return filterappointment;
  }

  findScheduleGoing(user) {
    if (!authStore.isAuthenticated) {
      filterappointment = null;
      return;
    }
    let dateObj = new Date();
    let dateval = dateObj.getFullYear() + '-' + ((dateObj.getMonth() + 1) > 9 ? dateObj.getMonth() + 1 : '0' + (dateObj.getMonth() + 1)) + '-' + (dateObj.getDate() > 9 ? dateObj.getDate() : '0' + dateObj.getDate());
    let alist = this.AppointmentsList.filter(item => item.patient !== null);
    if(!user) {
      user = authStore.user.username;
    }
    filterlist = alist.filter(item => item.patient.username === user);
    this.goingList = filterlist.filter(item => new Date(item.date.split('-')[0] + '-' + (item.date.split('-')[1] * 1 > 9 ? item.date.split('-')[1] : '0' + item.date.split('-')[1]) + '-' + (item.date.split('-')[2] * 1 > 9 ? item.date.split('-')[2] : '0' + item.date.split('-')[2])).getTime() >= new Date(dateval).getTime());
    return this.goingList;
  }

  findScheduleById(id) {
    if (!authStore.isAuthenticated) {
      filterappointment = null;
      return;
    }

    filterappointment = this.AppointmentsList.filter(item => item.id === id);
    return filterappointment;
  }

  /**
   * find schedule list by doctor Id
   * @author: JingWei Chen
   * @created: 1/3/2019
   */
  findScheduleByDoctorId(user, year, month, day) {
    filterappointment = this.AppointmentsList.filter(
      item => item.doctor === user
    );
    let result = [];
    if (year && month && day) {
      for (let i in filterappointment) {
        let d = filterappointment[i].date.replace(" ", "");
        let dary = d.split("-");
        if (dary[0] == year && dary[1] == month && dary[2] == day) {
          result.push(filterappointment[i]);
        }
      }
      return result;
    }
    return filterappointment;
  }

  /**
   * find schedule list by doctor Id
   * @author: JingWei Chen
   * @created: 1/3/2019
   */
  findScheduleByLastDoctorId(user, year, month, day) {
    filterappointment = this.AppointmentsList.filter(
      item => item.doctor === user
    );
    let dateObj = new Date();
    let dateval = dateObj.getFullYear() + '-' + ((dateObj.getMonth() + 1) > 9 ? dateObj.getMonth() + 1 : '0' + (dateObj.getMonth() + 1)) + '-' + (dateObj.getDate() > 9 ? dateObj.getDate() : '0' + dateObj.getDate());
    console.log(filterappointment);
    filterappointment = filterappointment.filter(
      item => item.date ? new Date(item.date.split('-')[0] + '-' + (item.date.split('-')[1] * 1 > 9 ? item.date.split('-')[1] : '0' + item.date.split('-')[1]) + '-' + (item.date.split('-')[2] * 1 > 9 ? item.date.split('-')[2] : '0' + item.date.split('-')[2])).getTime() >= new Date(dateval).getTime() : true
    );

    let result = [];
    if (year && month && day) {
      for (let i in filterappointment) {
        let d = filterappointment[i].date.replace(" ", "");
        let dary = d.split("-");
        if (dary[0] == year && dary[1] == month && dary[2] == day) {
          result.push(filterappointment[i]);
        }
      }
      return result;
    }
    return filterappointment;
  }

  Bla() {
    if (authStore.isAuthenticated) {
      this.userName = authStore.user.username;
      return this.userName;
    } else {
      return null;
    }
  }

  deleteAppointment(id) {
    // axios.delete(`http://207.154.246.97/doctor/schedeul` + id)
    // this.AppointmentsList.splice(id, 1);
    axios
      .delete(BASEURL + `/update/schedeul/` + id)
      .then(res => res.data)
      .then(Appointment => {
        this.getAppointments();
      })
      .catch(err => console.error(err));
  }
}
decorate(Store, {
  ratingSet: observable,
  Speciality: observable,
  filteredSpeciality: observable,
  onSearchSpecialityChangeHandler: action,
  changeSpecialityValue: action,
  doctorList: observable,
  likeDoctors: observable,
  getDoctors: action,
  filteredDoctors: observable,
  AreaDoctorNoSpeciality: observable,
  DoctorAreaAndSpe: observable,
  bringToSpeciality: action,
  bringAreaAndSpe: action,
  getSpeciality: action,
  getCities: action,
  getAreas: action,
  Area: observable,
  AreaList: observable,
  city: observable,
  doctorProfile: observable,
  cityList: observable,
  getArea: action,
  theQuery: observable,
  onSearchDoctorChangeHandler: action,
  changeDoctorValue: action,
  bringToProfile: action,
  getRating: action,
  StarRating: action,
  Collapsing: action,
  counter: observable,
  StarRatingDoctorSearch: action,
  Like: observable,
  addToLikeList: action,
  removeFromLikeList: action,
  EditProfile: action,
  editProf: observable,
  getEditProfile: action,
  getProfileId: action,
  ProfileToEdit: action,
  offersPics: observable,
  doctorSettingProfile: observable,
  postRate: action,
  getAppointments: action,
  AppointmentsList: observable,
  findDoctorInUsers: action,
  userPatient: observable,
  findUser: action,
  userDoctor: observable,
  users: observable,
  getUsers: action,
  getAllUsersProfile: action,
  findSchedule: action,
  getDoctorName: action,
  userName: observable,
  deleteAppointment: action,
  Bla: action,
  filterappointment: observable
});

const store = new Store();

store.getDoctors();
store.getCities();
store.getSpeciality();
store.getAreas();
store.getAppointments();
store.getUsers();
store.getAllUsersProfile();

export default store;

//.................................................................................

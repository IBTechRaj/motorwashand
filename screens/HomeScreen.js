import React, { useContext, useState } from 'react'
import { Alert, View, Modal, Button, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import FormButton from '../components/FormButton'
import BookingInput from '../components/BookingInput';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { Picker } from '@react-native-picker/picker'
import HomeStyles, { styles } from '../components/HomeStyles'
// require('../components/HomeStyles.js')
// import Firebase from 'firebase'
// import DatePicker from 'react-native-date-picker'
import DatePicker from 'react-native-datepicker'

import auth from '@react-native-firebase/auth'

import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../src/config';
import { MaterialDialog } from 'react-native-material-dialog';

const bookingsRef = db.ref('bookings')

const HomeScreen = () => {

  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState()
  const [mobile, setMobile] = useState(0)
  const [washDate, setWashDate] = useState(new Date())
  const [washTimeSlot, setWashTimeSlot] = useState('6 - 7 AM')
  const [address1, setAddress1] = useState()
  const [address2, setAddress2] = useState()
  const [address3, setAddress3] = useState()
  const [address4, setAddress4] = useState()
  const [pincode, setPincode] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);
  const [msgModalVisible, setMsgModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Uppal");
  // const [selectedSlot, setSelectedSlot] = useState('6 a.m. to 7 a.m.');
  const clearBooking = () => {
    setName("")
    setMobile(0)
    setWashDate(new Date())
    setWashTimeSlot('6 - 7 AM')
    setAddress1("")
    setAddress2("")
    setAddress3("")
    setAddress4("")
    setPincode(0)
  }

  const saveBooking = () => {
    if (name && mobile) {
      bookingsRef.child(user.uid).push({
        name: name,
        mobile: mobile,
        wash_date: washDate,

        wash_time: washTimeSlot,

        location: {
          door: address1,
          street: (address2 || "Xx"),
          sub_area: (address3 || "Xx"),
          main_area: (address4 || "Xx"),
          pin: pincode
        }
      })
    }
    // Alert.alert("Hi " + name + " We have received your order with the following details " + name + " " + mobile + " " + washDate + " " + washTime + " " + address1 + " " + address2 + " " + address3 + " " + address4 + " " + pincode)
    // Alert.alert("Hi " + name + " We have received your order with the following details:\n " + name + " \n" + mobile + "\n " + washDate + " \n" + washTimeSlot + " \n" + pincode)


  }

  auth().onAuthStateChanged((user) => {
    // console.log('onAuthStateChanged')
    if (user) {
      // getUserData(user.uid)
      // auth = user
      // $('body').removeClass('auth-false').addClass('auth-true')
      // document.getElementById('show-name').innerHTML = auth.displayName
      bookingsRef.child(user.uid).on('child_added', onChildAdd)
    }
  })
  // })
  const showConfirmation = () => {
    bookingsRef.on('child_added', function (snap) {
      // console.log(snap.val())
      snap.forEach(function (childSnapshot) {
        var key = childSnapshot.key
        var childData = childSnapshot.val()
        // Alert.alert(childData)
      })
    })
  }
  let mess;
  // const name = <p>Name<span style={{ color: "red" } >*</span></p>
  const onChildAdd = (snap) => {
    mess = snap.val
    // Alert.alert(snap.val)
    // Alert.alert(bookingHtmlFromObject(snap.key, snap.val()))
    // showFeedback('We have booked your Car Wash')
  }
  const bookingHtmlFromObject = (booking) => {
    return (

      '<div class="card booking text-left" style="width: 90rem; height= 10rem" id="' +
      // key +
      '">' +
      '<div class="card-body"  style="background: white;">' +
      '<h5 class="card-title" style="color: green">' +
      'Your Booking Details ' +
      '</h5>' +
      '<h5 class="card-title">' +
      'Name : ' +
      booking.name +
      '</h5>' +
      '<h6 class="card-subtitle  text-muted">' +
      'Mobile : ' +
      booking.mobile +
      '</h6>' +
      '<h6 class="card-subtitle mb-2 text-muted">' +
      'Wash Date : ' +
      booking.wash_date +
      ', ' +
      'Wash Time : ' +
      booking.wash_time +
      '</h6>' +
      '<h4 class="card-title">' +
      '</h4>' +
      '</div>' +
      '</div>'
    )
  }

  return (

    <View style={styles.container}>
      <HomeStyles style={styles.container} />
      <ImageBackground
        source={require('../assets/bg1.jpg')}
        style={styles.image}
      >

        <Text style={styles.text}>Welcome</Text>

        <Pressable onPress={() => logout()} >
          <Text style={styles.btnLogout}>Logout</Text>
        </Pressable>


        <View style={styles.centeredNotes}>
          <Text style={styles.centeredNotes}>At Present we are servicing the following locations</Text>
          <Text style={styles.centeredNotes}>Click to view</Text>
        </View>

        <View style={styles.centeredNotes}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150, color: '#ffffff' }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Uppal" value="uppal" style={{ borderColor: '#ffffff' }} />
            <Picker.Item label="Habsiguda" value="habsiguda" />
            <Picker.Item label="L B Nagar" value="L B Nagar" />
            <Picker.Item label="Malkajgiri" value="malkajgiri" />
          </Picker>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter your Booking Details</Text>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <BookingInput
                  labelValue={name}
                  onChangeText={(name) => setName(name)}
                  placeholderText="Name"
                  iconType="user"
                />
              </View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <BookingInput
                  labelValue={mobile}
                  onChangeText={(mobile) => setMobile(mobile)}
                  placeholderText="Mobile"
                  maxLength={10}
                  keyboardType={'numeric'}
                /></View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>

                <DatePicker
                  style={styles.datePickerStyle}
                  date={washDate} // Initial date from state
                  mode="date" // The enum of date, datetime and time
                  // placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate={new Date()}
                  maxDate="01-01-2022"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      //display: 'none',
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => {
                    setWashDate(date);
                    // Alert.alert(date)
                  }}
                />
                {/* <DatePicker
                  date={washDate}
                  mode="date"
                  onChangeDate={(washDate) => setWashDate(washDate)}
                /> */}
                {/* <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <BookingInput
                  labelValue={washDate}
                  onChangeText={(washDate) => setWashDate(washDate)}
                  placeholderText="Date of Wash" */}
                {/* /> */}
              </View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <Picker
                  washTimeSlot={washTimeSlot}

                  // style={{ height: 50, width: 100, color: '#000000' }}
                  style={styles.timePickerStyle}
                  // customStyles={{
                  //   dateIcon: {
                  //     //display: 'none',
                  //     position: 'absolute',
                  //     left: 0,
                  //     top: 4,
                  //     marginLeft: 0,
                  //   },
                  //   dateInput: {
                  //     marginLeft: 36,
                  //   },
                  // }}
                  onValueChange={(itemValue, itemIndex) => setWashTimeSlot(itemValue)}
                >
                  <Picker.Item label="Time :    6 - 7 AM" value='6 - 7 AM' style={{ borderColor: '#ffffff' }} />
                  <Picker.Item label="Time :    7 - 8 AM" value='7 - 8 AM' />
                  <Picker.Item label="Time :    8 - 9 AM" value='8 - 9 AM' />
                  <Picker.Item label="Time :    9 - 10 AM" value='9 - 10 AM' />
                  <Picker.Item label="Time :    10 - 11 AM" value='10 - 11 AM' />
                  <Picker.Item label="Time :    11 - 12 Nn" value='11 - 12 Nn' />
                  <Picker.Item label="Time :    12 Nn - 1 PM" value='12 Nn - 1 PM' />
                  <Picker.Item label="Time :    1 - 2 PM" value='1 - 2 PM' />
                  <Picker.Item label="Time :    2 - 3 PM" value='2 - 3 PM' />
                  <Picker.Item label="Time :    3 - 4 PM" value='3 - 4 PM' />
                  <Picker.Item label="Time :    4 - 5 PM" value='4 - 5 PM' />
                  <Picker.Item label="Time :    5 - 6 PM" value='5 - 6 PM' />
                  <Picker.Item label="Time :    6 - 7 PM" value='6 - 7 PM' />
                  {/* <Picker.Item label="Uppal" value="uppal" style={{ borderColor: '#ffffff' }} />
                  <Picker.Item label="Habsiguda" value="habsiguda" />
                  <Picker.Item label="L B Nagar" value="L B Nagar" />
                  <Picker.Item label="Malkajgiri" value="malkajgiri" /> */}
                </Picker>

                {/* <BookingInput
                  labelValue={washTime}
                  onChangeText={(washTime) => setWashTime(washTime)}
                  placeholderText="Time of Wash"
                /> */}
              </View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <BookingInput
                  labelValue={address1}
                  onChangeText={(address1) => setAddress1(address1)}
                  placeholderText="Address1"
                /></View>

              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>  </Text>
                <BookingInput
                  labelValue={address2}
                  onChangeText={(address2) => setAddress2(address2)}
                  placeholderText="Address2"
                /></View>

              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>  </Text>
                <BookingInput
                  labelValue={address3}
                  onChangeText={(address3) => setAddress3(address3)}
                  placeholderText="Address3"
                /></View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>  </Text>
                <BookingInput
                  labelValue={address4}
                  onChangeText={(address4) => setAddress4(address4)}
                  placeholderText="Address4"
                /></View>
              <View style={{ flexDirection: "row" }}><Text style={styles.modalMandatory}>*</Text>
                <BookingInput
                  labelValue={pincode}
                  onChangeText={(pincode) => setPincode(pincode)}
                  placeholderText="Pin Code"
                  maxLength={6}
                  keyboardType={'numeric'}
                /></View>
              {/* <Pressable
                onPress={() => {
                  if (mobile.length < 10) {
                    Alert.alert("Please enter 10 digits for mobile")
                  }
                  else
                    if (pincode.length < 6) {
                      Alert.alert("Please enter 6 digits for pincode")
                    }
                    else
                      if (name && mobile && washDate && washTimeSlot && address1 && pincode) {
                        setModalVisible(!modalVisible)
                        saveBooking()
                      } else {
                        Alert.alert("Please enter the required details")
                      }
                }}
              > */}
              <Pressable
                onPress={() => {
                  if (mobile.length < 10) {
                    Alert.alert("Please enter 10 digits for mobile")
                  }
                  else
                    if (pincode.length < 6) {
                      Alert.alert("Please enter 6 digits for pincode")
                    }
                    else
                      if (name && mobile && washDate && washTimeSlot && address1 && pincode) {
                        setModalVisible(!modalVisible)
                        setMsgModalVisible(!msgModalVisible)
                        // saveBooking()
                      } else {
                        Alert.alert("Please enter all the required details")
                      }
                }}
              >
                <Text style={styles.btnSubmit}>Submit</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible)

                }}
              >
                <Text style={styles.btnCancel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          // style={[styles.textStyle, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnBookSlot}>Book Slot</Text>
          {/* <FormButton buttonTitle='Book Slot' style={{ alignSelf: 'flex-start' }} onPress={() => setShowModal(true)} /> */}
        </Pressable>


        {/* <FormButton buttonTitle='Book Slot' style={{ alignSelf: 'flex-start' }} onPress={() => setShowModal(true)} /> */}

        {/* <BookingForm /> */}
        < MaterialDialog
          title="Confirm Your Order"
          visible={msgModalVisible}
          onOk={() => {
            saveBooking()
            clearBooking()
            Alert.alert("Booking confirmed")
            setMsgModalVisible(!msgModalVisible)
          }}
          onCancel={() => {
            Alert.alert("Booking Cancelled")
            setMsgModalVisible(!msgModalVisible)
          }}
        >
          < Text >
            {"Hi " + name + ", We have received your order with the following details:\n " + "Name : " + name + " \n" + "Mobile : " + mobile + "\n " + "Date : " + washDate + " \n" + "Time : " + washTimeSlot}
            {/* Let Google help apps determine location.This means sending anonymous */}
            {/* location data to Google, even when no apps are running. */}
          </Text >
        </MaterialDialog >
      </ImageBackground>

    </View >
  )
}

export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f0fafd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // padding: 20,
//   },
//   textStyle: {
//     fontSize: 20,
//     color: 'white',
//     alignSelf: 'flex-start',
//   },
//   btnSubmit: {
//     backgroundColor: 'blue',
//     width: windowWidth / 1.5,
//     fontSize: 20,
//     color: 'white',
//     // alignSelf: 'flex-start',
//     // width: '100%',
//     width: windowWidth / 1.5,
//     height: windowHeight / 10,
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'contain',
//     height: '100%',
//     width: '100%',
//     margin: 0,
//   },
//   datePickerStyle: {
//     width: 200,
//     marginTop: 5,
//   },
//   timePickerStyle: {
//     width: 200,
//     marginTop: 5,
//     color: '#000000'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   centeredNotes: {
//     // flex: 1,
//     fontSize: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     color: "#ffffff"
//     // , borderWidth: 5, borderColor: '#ffffff'
//   },
//   centeredList: {
//     // flex: 1,
//     fontSize: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//     color: "#ffffff"
//     , borderWidth: 1, borderColor: '#ffffff'
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "flex-start",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   modalMandatory: {
//     color: 'red'
//   },
//   btnLogout: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     width: windowWidth / 4,
//     backgroundColor: "#fa2549",
//     alignSelf: 'flex-end',
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   btnBookSlot: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     width: windowWidth / 4,
//     backgroundColor: "#0eb51c",
//     alignSelf: 'center',
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   btnSubmit: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     width: windowWidth / 1.45,
//     backgroundColor: "#2e64e5",
//     // alignSelf: 'center',
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   btnCancel: {
//     borderRadius: 5,
//     padding: 10,
//     elevation: 2,
//     width: windowWidth / 1.45,
//     backgroundColor: "#fa2549",
//     marginTop: 5,
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   text: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     fontWeight: "bold"
//   }
// })

{/* <FormInput
            labelValue={name}
            onChangeText={(name) => setName(name)}
            placeholderText="Name"
            iconType="user"
          />

          <FormInput
            labelValue={mobile}
            onChangeText={(mobile) => setMobile(mobile)}
            placeholderText="Mobile"
          />

          <FormInput
            labelValue={washDate}
            onChangeText={(washDate) => setWashDate(washDate)}
            placeholderText="Date of Wash"
          />
          <Text>Address 1</Text>
          <Text>Address 2</Text>
          <Text>Address 3</Text>
          <Text>Address 4</Text>
          <Text>Pin Code</Text> */}
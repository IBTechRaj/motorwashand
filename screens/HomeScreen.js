import React, { useContext, useState } from 'react'
import { Alert, View, Modal, Button, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput';
// import Firebase from 'firebase'

import auth from '@react-native-firebase/auth'

import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../src/config';

const bookingsRef = db.ref('bookings')

const HomeScreen = () => {

  const { user, logout } = useContext(AuthContext)
  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [washDate, setWashDate] = useState()
  const [washTime, setWashTime] = useState()
  const [address1, setAddress1] = useState()
  const [address2, setAddress2] = useState()
  const [address3, setAddress3] = useState()
  const [address4, setAddress4] = useState()
  const [pincode, setPincode] = useState()

  const [modalVisible, setModalVisible] = useState(false);

  const saveBooking = () => {
    if (name && mobile) {
      bookingsRef.child(user.uid).push({
        name: name,
        mobile: mobile,
        wash_date: washDate,

        wash_time: washTime,

        location: {
          door: address1,
          street: address2,
          sub_area: address3,
          main_area: address4,
          pin: pincode
        }
      })
    }
    Alert.alert("Hi " + name + " We have received your order with the following details")
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
      <ImageBackground
        source={require('../assets/bg1.jpg')}
        style={styles.image}
      >

        <Text style={styles.text}>Welcome</Text>

        <FormButton buttonTitle='Logout' onPress={() => logout()} />
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
              <FormInput
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
              <FormInput
                labelValue={washTime}
                onChangeText={(washTime) => setWashTime(washTime)}
                placeholderText="Time of Wash"
              />
              <FormInput
                labelValue={address1}
                onChangeText={(address1) => setAddress1(address1)}
                placeholderText="Address1"
              />
              <FormInput
                labelValue={address2}
                onChangeText={(address2) => setAddress2(address2)}
                placeholderText="Address2"
              />
              <FormInput
                labelValue={address3}
                onChangeText={(address3) => setAddress3(address3)}
                placeholderText="Address3"
              />
              <FormInput
                labelValue={address4}
                onChangeText={(address4) => setAddress4(address4)}
                placeholderText="Address4"
              />
              <FormInput
                labelValue={pincode}
                onChangeText={(pincode) => setPincode(pincode)}
                placeholderText="Pin Code"
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  saveBooking()
                  // bookingHtmlFromObject(mess)
                  // Alert.alert(user.uid, user.email)
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.textStyle, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Book Slot</Text>
          {/* <FormButton buttonTitle='Book Slot' style={{ alignSelf: 'flex-start' }} onPress={() => setShowModal(true)} /> */}
        </Pressable>


        {/* <FormButton buttonTitle='Book Slot' style={{ alignSelf: 'flex-start' }} onPress={() => setShowModal(true)} /> */}

        {/* <BookingForm /> */}
      </ImageBackground>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
  },
  // submitStyle: {
  //   fontSize: 20,
  //   color: 'white',
  //   alignSelf: 'flex-start',
  // },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    margin: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

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
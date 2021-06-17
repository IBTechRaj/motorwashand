import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { windowHeight, windowWidth } from '../utils/Dimentions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import { db } from '../src/config';


// firebase.initializeApp(firebaseConfig)

var bookingsRef = db.ref('bookings')

const BookingForm = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [washDate, setWashDate] = useState()

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      // onRequestClose={() => {
      // Alert.alert("Modal has been closed.");
      // setModalVisible(!modalVisible);
      // }}
      >

        <Text>Book Your Slot</Text>

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
        <Text>Address 1</Text>
        <Text>Address 2</Text>
        <Text>Address 3</Text>
        <Text>Address 4</Text>
        <Text>Pin Code</Text>

        <FormButton
          title="Click Here"
        // onPress={() => setModalVisible(true)}
        // onPress={() => alert('Button Clicked!')}
        />
      </Modal>
    </View>
  );
};

export default BookingForm

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
})
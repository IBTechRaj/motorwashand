import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';
import Validator from 'validator';
// const isEmpty = require("./is-empty");

// const isEmpty = value => {
//   value === undefined ||
//     value === null ||
//     (typeof value === "Object" && Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)

// }

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { googleLogin } = useContext(AuthContext);
  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/rn-motor-logo1.png')}
        style={styles.logo}
      /> */}
      {/* <Text style={styles.text}>My Motor Wash</Text> */}
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (!email && !password && !confirmPassword) {
            Alert.alert('Please enter all details to signup')
          } else
            if (!Validator.isEmail(email)) {
              Alert.alert('Please enter valid email')
            } else
              if (password != confirmPassword) {
                Alert.alert('Password and Confirm Password do not match')
              }
              else
                if (password.length < 6 || confirmPassword.length < 6) {
                  Alert.alert('Password should be minimum 6 char')
                }
                else
                  if (email && password && confirmPassword) {
                    register(email, password)
                  }
                  else {
                    Alert.alert("Please enter all the required details")
                  }



        }
        }
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
          Privacy Policy
        </Text>
      </View>

      {Platform.OS === 'android' ? (
        <View>
          {/* <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => { }}
          /> */}

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    // resizeMode: 'cover',
    resizeMode: 'contain',
    marginTop: -15,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});

// let errors = {};
// let temp_email = isEmpty(email) ? "" : email;
// setEmail(temp_email)
// let temp_password = isEmpty(password) ? "" : password;
// setPassword(temp_password)
// let temp_confirmPassword = isEmpty(confirmPassword) ? "" : confirmPassword;
// setConfirmPassword(temp_confirmPassword)

// if (Validator.isEmpty(email)) {
//   errors.email = "Email field is required";
// }
// // runs if not in email exists but not in format
// if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
//   errors.email = "Email is invalid";
// }
// if (Validator.isEmpty(password)) {
//   errors.password = "Password field is required";
// }
// // runs if password exists but not in proper format
// if (
//   !Validator.isEmpty(password) &&
//   !Validator.isLength(password, { min: 6, max: 30 })
// ) {
//   errors.password = "Password must be at least 6 chracters";
// }
// if (Validator.isEmpty(confirmPassword)) {
//   errors.confirmPassword = "Confirm Password ";
// }
// // runs if not in password 2 exists but not in format
// if (
//   !Validator.isEmpty(confirmPassword) &&
//   !Validator.equals(password, confirmPassword)
// ) {
//   errors.confirmPassword = "Passwords must match";
// }
// if (!Validator.isEmpty(email) && !Validator.isEmpty(password)) {
//   //   Alert.alert(errors)
//   // }
//   // else 
//   register(email, password)
//   // return { errors, isValid: isEmpty(errors) };
// }
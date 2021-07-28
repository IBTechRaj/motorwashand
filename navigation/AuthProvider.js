import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
          } catch (e) {
            // console.log(e)
            Alert.alert('Error:', e.message)
          }
        },
        googleLogin: async () => {
          try {
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          }
          catch (error) {
            console.log({ error })
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
          } catch (e) {
            // console.log(e)
            Alert.alert('Error:', e.message)
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            // console.log(e)
            Alert.alert('Error:', e.message)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
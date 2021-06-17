import Firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyCT5Ecw3QINV0SU7mH2zJ8j2FC_-n_pV8s',
  authDomain: 'motorwash-8e684.firebaseapp.com',
  projectId: 'motorwash-8e684',
  storageBucket: 'motorwash-8e684.appspot.com',
  messagingSenderId: '408982107627',
  appId: '1:408982107627:web:8e463163cc988d970fd5ae',
  measurementId: 'G-X9LC6PLBT9'
}

const bapp = Firebase.initializeApp(firebaseConfig);
export const db = bapp.database();
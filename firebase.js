// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5ZIU7HRcq6f132iF_Ru5HmCJMTSIjdVQ',
  authDomain: 'standeasy-3cb23.firebaseapp.com',
  projectId: 'standeasy-3cb23',
  storageBucket: 'standeasy-3cb23.appspot.com',
  messagingSenderId: '1068547289354',
  appId: '1:1068547289354:web:ceedecf2ec5bc5ae068af3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

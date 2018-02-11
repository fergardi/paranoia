var firebase = require('firebase/app')
// require('firebase/auth')
require('firebase/database')
// require('firebase/messaging')

var config = {
  apiKey: 'AIzaSyD5fEIKZLgGechLNZEwgD1-_SCZWMN1Ink',
  authDomain: 'paranoia-a57bb.firebaseapp.com',
  databaseURL: 'https://paranoia-a57bb.firebaseio.com',
  projectId: 'paranoia-a57bb',
  storageBucket: '',
  messagingSenderId: '80517598893'
}

const app = firebase.initializeApp(config)

export const database = app.database()

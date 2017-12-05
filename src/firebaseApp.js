import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDkBwk4y_0owfwnO5ojDvIYved6gOLzppc',
  authDomain: 'cspot-ify.firebaseapp.com',
  databaseURL: 'https://cspot-ify.firebaseio.com',
  projectId: 'cspot-ify',
  storageBucket: 'cspot-ify.appspot.com',
  messagingSenderId: '154842492597'
}

export const firebaseApp = firebase.initializeApp(config)

export const plansRef = firebaseApp.database().ref().child('plans')

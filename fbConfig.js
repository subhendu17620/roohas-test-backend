require("firebase/auth");
const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./roohas-test-firebase-adminsdk-89c4c-4df6053fc1.json");
var firebaseConfig = {
  apiKey: "AIzaSyDqu4eyeSWikJifrY9QCEa-fGJL0flOR4k",
  authDomain: "roohas-test.firebaseapp.com",
  databaseURL: "https://roohas-test.firebaseio.com",
  projectId: "roohas-test",
  storageBucket: "roohas-test.appspot.com",
  messagingSenderId: "961306156449",
  appId: "1:961306156449:web:cb9c6c531fe4037e7fbfe0",
  measurementId: "G-YQJVCS727C",
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://roohas-test.firebaseio.com",
});
module.exports = { firebase, admin };

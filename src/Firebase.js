import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBp_ErQQBVpUBbNtVdBGu7hXySbR3S4M-Q",
    authDomain: "find-golf-courses.firebaseapp.com",
    databaseURL: "https://find-golf-courses.firebaseio.com",
    projectId: "find-golf-courses",
    storageBucket: "find-golf-courses.appspot.com",
    messagingSenderId: "218848106622"
};
firebase.initializeApp(config);

export default firebase;

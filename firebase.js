import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAX518dcdoClkCBWwGn7fIsI5UaoW58VeQ",
    authDomain: "easychat-5b107.firebaseapp.com",
    projectId: "easychat-5b107",
    storageBucket: "easychat-5b107.appspot.com",
    messagingSenderId: "1083144661496",
    appId: "1:1083144661496:web:bc1b2b93cf6262e49dce0d"
  };
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }
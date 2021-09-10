
import firebase from 'firebase/app';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBUwJXvDOrgdQDP_aRFonFXPstxwD1UdZs",
    authDomain: "fakturor-projekt-vue.firebaseapp.com",
    projectId: "fakturor-projekt-vue",
    storageBucket: "fakturor-projekt-vue.appspot.com",
    messagingSenderId: "1010787381308",
    appId: "1:1010787381308:web:7ef8af1261c123bfbb5339"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig); 

  export default firebaseApp.firestore();
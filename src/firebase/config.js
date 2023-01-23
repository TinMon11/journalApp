// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu4UTncBUK2TcGXjTUnbejueydG6fWG5Q",
  authDomain: "journalapp-2a9ec.firebaseapp.com",
  projectId: "journalapp-2a9ec",
  storageBucket: "journalapp-2a9ec.appspot.com",
  messagingSenderId: "251030538853",
  appId: "1:251030538853:web:9af97461cfa0fd4b0a548c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
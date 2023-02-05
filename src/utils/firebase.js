import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCQgtSXA4j8OOnwb3NPXHzyaeoOOouc6gM',

  authDomain: 'caffme-2d34f.firebaseapp.com',

  projectId: 'caffme-2d34f',

  storageBucket: 'caffme-2d34f.appspot.com',

  messagingSenderId: '298834162270',

  appId: '1:298834162270:web:be984441728c3948efbacf',

  measurementId: 'G-2N0DGCTMDZ',
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

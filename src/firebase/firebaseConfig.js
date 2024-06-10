import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
apiKey: import.meta.env.VITE_APP_APIKEY, 
authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
projectId: import.meta.env.VITE_APP_PROJECTID,
storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
appId: import.meta.env.VITE_APP_APPID
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();
export {auth,db};
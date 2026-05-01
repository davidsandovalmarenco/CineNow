import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Todo: Add valid firebase config from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCNq79dtBQLO8kJNGX-27xTa4c0hEmP-PA",
  authDomain: "cinenow-6b3ca.firebaseapp.com",
  projectId: "cinenow-6b3ca",
  storageBucket: "cinenow-6b3ca.appspot.com",
  messagingSenderId: "896265964245",
  appId: "1:896265964245:web:730a6fc87adc850117305c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

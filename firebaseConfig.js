import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAqOynHMaMoq3Gsg4GSrXJir3h3TRimHEk",
  authDomain: "fitme-firebase-4cc63.firebaseapp.com",
  projectId: "fitme-firebase-4cc63",
  storageBucket: "fitme-firebase-4cc63.appspot.com",
  messagingSenderId: "73810137016",
  appId: "1:73810137016:web:0fa3700e4469ca504bc94d",
  measurementId: "G-81BQLCZQLB"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };




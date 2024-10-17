import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCGMJJKpGWIhVQsk-oKYbtHafWzop4wH5E",
  authDomain: "hospitalsystem-3ae86.firebaseapp.com",
  projectId: "hospitalsystem-3ae86",
  storageBucket: "hospitalsystem-3ae86.appspot.com",
  messagingSenderId: "641498625937",
  appId: "1:641498625937:web:b24360824c82622a08cc30"
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




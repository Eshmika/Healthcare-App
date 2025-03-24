import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        getItem: jest.fn(() => Promise.resolve(null)),
        setItem: jest.fn(() => Promise.resolve()),
        removeItem: jest.fn(() => Promise.resolve()),
        clear: jest.fn(() => Promise.resolve()),
    };
});

// Mock Firebase Auth functions
jest.mock('firebase/auth', () => {
    return {
        initializeAuth: jest.fn(() => ({
            onAuthStateChanged: jest.fn((callback) => {
                // You can call the callback with a mock user object if needed
                callback({ uid: 'mock-user-id' });
            }),
        })),
        getReactNativePersistence: jest.fn(() => jest.fn()), // Mock the persistence function
    };
});

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})), // Mock getFirestore
}));
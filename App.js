// App.js
import 'react-native-gesture-handler'; // Import at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookAppointmentScreen from './BookAppointment/BookAppointmentScreen';
import PatientDetailsScreen from './BookAppointment/PatientDetailsScreen';
import DoctorHomeScreen from './BookAppointment/DoctorHomeScreen';
import BookedListScreen from './BookAppointment/BookedListScreen';
import SignUpScreen from './Auth/SignupScreen';
import LoginScreen from './Auth/LoginScreen';
import Profile from './Auth/Profile';
import UpdateProfile from './Auth/UpdateProfile';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider placement='top' offsetTop={100} animationType='zoom-in'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
          <Stack.Screen name="Update Profile" component={UpdateProfile} options={{headerShown:false}}/>          
          <Stack.Screen name="Book Appointment" component={BookAppointmentScreen} />          
          <Stack.Screen name="Patient Details" component={PatientDetailsScreen} />  
          <Stack.Screen name="Doctor Home" component={DoctorHomeScreen} options={{headerShown:false}}/>   
          <Stack.Screen name="Booked Appointment List" component={BookedListScreen} />    

        </Stack.Navigator>
      </NavigationContainer>    
    </ToastProvider>
  );
}


// npm i moment
// npm install @react-native-picker/picker
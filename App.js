// App.js
import 'react-native-gesture-handler'; // Import at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookAppointmentScreen from './BookAppointment/BookAppointmentScreen';
import PatientDetailsScreen from './BookAppointment/PatientDetailsScreen';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider placement='top' offsetTop={100} animationType='zoom-in'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Book Appointment">
          <Stack.Screen name="Book Appointment" component={BookAppointmentScreen} />          
          <Stack.Screen name="Patient Details" component={PatientDetailsScreen} />          

        </Stack.Navigator>
      </NavigationContainer>    
    </ToastProvider>
  );
}

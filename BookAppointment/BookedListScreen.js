import { doc, getDoc, updateDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';

const BookedListScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [loggedInPatientName, setLoggedInPatientName] = useState('');

  const getLoggedInPatientAppointments = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const patientDoc = await getDoc(doc(db, "Patients", user.uid));
          if (patientDoc.exists()) {
            const patientData = patientDoc.data();
            setLoggedInPatientName(patientData.Name);

            if (patientData.appointments) {
              setAppointments(patientData.appointments);
            }
          } else {
            console.log("No such document!");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching patient data:", error);
          setLoading(false);
        }
      }
    });
  };

  const handleAppointmentDelete = async (index) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const patientDocRef = doc(db, "Patients", user.uid);
        const patientDoc = await getDoc(patientDocRef);

        if (patientDoc.exists()) {
          const patientData = patientDoc.data();
          const updatedAppointments = [...patientData.appointments];

          updatedAppointments.splice(index, 1);
          
          await updateDoc(patientDocRef, {
            appointments: updatedAppointments,
          });

          console.log("Appointment successfully deleted");
          setAppointments(updatedAppointments);
        }
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);        
    }
  };

  const confirmAppointmentDelete = (index) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel the appointment?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => handleAppointmentDelete(index),
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getLoggedInPatientAppointments();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#39170C" />
          <Text>Loading List...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>  
          <View style={{ alignItems: 'center' }}>
            {appointments.map((appointment, index) => (
              <View key={index}>
                <View style={styles.cards}>
                  <Text style={styles.cardname}>Doctor Name: {appointment.DoctorName}</Text>
                  <Text style={styles.cardlanguage}>Patient name: {loggedInPatientName}</Text>     
                  <Text style={styles.cardlanguage}>Date: {appointment.Date}</Text>                  
                  <Text style={styles.cardlanguage}>Time: {appointment.Time}</Text>                  
                  <Text style={styles.cardlanguage}>Appointment Type: {appointment.AppointmentType}</Text>                  
                  <Text style={styles.cardlanguage}>Problem: {appointment.Problem}</Text>
                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={styles.typebtn} onPress={() => confirmAppointmentDelete(index)} >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19 }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>                 
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff', 
  },
  cards: {
    backgroundColor: '#fff', 
    marginTop: 5,
    width: 350,
    height: 320,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,      
  },
  cardlanguage: {
    fontSize: 18,
    marginBottom: 5, 
    color: '#677294',      
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typebtn: {
    backgroundColor: '#39170C',
    color: '#fff',
    padding: 14,
    borderRadius: 7,
    width: 300,
    alignItems: 'center',
  },  
});

export default BookedListScreen;

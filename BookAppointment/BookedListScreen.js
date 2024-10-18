import { collection, deleteDoc, doc, getDoc, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';

const BookedListScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [loggedInPatientName, setLoggedInPatientName] = useState('');

  const getLoggedInPatient = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const patientDoc = await getDoc(doc(db, "Patients", user.uid));
          if (patientDoc.exists()) {
            const patientData = patientDoc.data();
            setLoggedInPatientName(patientData.Name); 
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      }
    });
  };
  
  const getDoctordetails = () => {
    const appointmentsRef = collection(db, "Appointments");
    
    const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
      const doctorList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  };
  
  const handleDoctorDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Appointments", id))
        .then(() => {
          console.log("Appointment successfully deleted");
        });
    } catch (error) {
      console.error(error);        
    }
  };

  const confirmDoctorDelete = (id) => {
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
          onPress: () => handleDoctorDelete(id),
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getLoggedInPatient();
    const unsubscribe = getDoctordetails();

    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
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
            {doctors
              .filter(doctor => doctor.PatientName === loggedInPatientName)
              .map(doctor => (
                <View key={doctor.id}>
                  <View style={styles.cards}>
                    <Text style={styles.cardname}>Doctor Name: {doctor.DoctorName}</Text>
                    <Text style={styles.cardlanguage}>Patient name: {doctor.PatientName}</Text>     
                    <Text style={styles.cardlanguage}>Date: {doctor.Date}</Text>                  
                    <Text style={styles.cardlanguage}>Time: {doctor.Time}</Text>                  
                    <Text style={styles.cardlanguage}>Appointment Type: {doctor.AppointmentType}</Text>                  
                    <Text style={styles.cardlanguage}>Problem: {doctor.Problem}</Text>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                      <TouchableOpacity style={styles.typebtn} onPress={() => confirmDoctorDelete(doctor.id)} >
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

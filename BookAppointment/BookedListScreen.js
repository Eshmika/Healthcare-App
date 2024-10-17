import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { db } from '../firebaseConfig';

const BookedListScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);   
  const [searchdoctor, setSearchDoctor] = useState('');
  const [loading, setLoading] = useState(true);

  const getDoctordetails = async () => {
    try {
      const response = await getDocs(collection(db, "Appointments")); 
      const doctorList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorList);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching guides:', error);
      setLoading(false);
    }
  };  
  
  const handleDoctorDelete = async (id) => {
    try {     
        await deleteDoc(doc(db, "Appointments", id))
        .then(() => {
          getDoctordetails();
        });
    } catch (error) {
        console.error(error);        
    }
  }   


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
    getDoctordetails();
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
          {/* <Text style={styles.title}>Book Travel Guide List</Text> */}
          <View style={{alignItems:'center', }}>
            {doctors.filter(doctor => doctor.DoctorName.toLowerCase().includes(searchdoctor.toLowerCase())).map(doctor => (
              <View key={doctor.id} >
                <View style={styles.cards}>                  
                  <Text style={styles.cardname}>Doctor Name: {doctor.DoctorName}</Text>
                  <Text style={styles.cardlanguage}>Patient name: {doctor.PatientName}</Text>     
                  <Text style={styles.cardlanguage}>Date: {doctor.Date}</Text>                  
                  <Text style={styles.cardlanguage}>Time: {doctor.Time}</Text>                  
                  <Text style={styles.cardlanguage}>Appointment Type: {doctor.AppointmentType}</Text>                  
                  <Text style={styles.cardlanguage}>Problem: {doctor.Problem}</Text>

                  <View style={{ alignItems: 'center', marginTop: 20,}}>
                    <TouchableOpacity style={styles.typebtn} onPress={() => confirmDoctorDelete(doctor.id)} >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19,}}>Cancel</Text>
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
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,   
    color: '#333333',      
    flexDirection: 'row',
  
  },
  cards:{
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
    // textAlign: 'center',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,      
  },
  cardlanguage: {
    fontSize: 18,
    // textAlign: 'center',
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

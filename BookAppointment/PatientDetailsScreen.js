import { addDoc, collection } from '@firebase/firestore';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';


const PatientDetailsScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [problem, setProblem] = useState('');
  const { doctorName, appointmentType, time, date } = route.params;

  const submitappointmentdetails = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Appointments"), {
        PatientName: "Eshmika",
        Gender: "Male",
        Age: "25",
        Location: "Colombo",
        Problem: problem,
        DoctorName: doctorName,
        AppointmentType: appointmentType,
        Time: time,
        Date: date,
      });
      setModalVisible(true);
    } catch (error) {
        console.error(error);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value="Eshmika"
            // onChangeText={setUsername} 
            readOnly
          />

          <Text style={styles.title}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value="Male"
            // value={username}
            // onChangeText={setUsername} 
            readOnly
          />      
          
          <Text style={styles.title}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value="25"
            // value={username}
            // onChangeText={setUsername} 
            readOnly
          />

          <Text style={styles.title}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value="Colombo"
            // value={username}
            // onChangeText={setUsername} 
            readOnly
          />

          <Text style={styles.title}>Write your problem</Text>
          <TextInput
            style={styles.textArea}
            placeholder="hello...."
            value={problem}
            onChangeText={setProblem} 
            multiline={true}
            numberOfLines={4}
            required
          />

          <View style={{ marginTop: 40, alignItems:'center',}} >
            <TouchableOpacity style={styles.continuebtn} onPress={submitappointmentdetails}>
              <Text style={{ color: '#fff', fontSize: 19, }}>Continue</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                {/* <Image source={require('../assets/Thankyoualerticon.png')} style={styles.modalIcon} /> */}
                <Text style={styles.modalText}>Thank You!</Text>
                <Text style={styles.modalSubText}>Your Appointment Successful</Text>
                <Text style={styles.modalSubText2}>You booked an appointment with </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Doctor Home');  
                  }}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,  
    color: '#0891b2', 
  },  
  input: {
    height: 50,
    borderColor: '#164e63',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 10,
    fontSize: 15,
  }, 
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top", 
    borderColor: '#164e63',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  continuebtn: {
    backgroundColor: '#164e63',    
    borderRadius: 15,
    shadowColor: '#000',   
    paddingRight: 20,
    paddingLeft: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '50%',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#164e63',
  },
  modalSubText: {
    fontSize: 17,
    color: '#677294',
    marginBottom: 20,
  },
  modalSubText2: {
    fontSize: 15,
    color: '#677294',
    marginBottom: 40,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#164e63', 
    width: 200,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PatientDetailsScreen;

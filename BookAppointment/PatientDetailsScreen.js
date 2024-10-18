import { addDoc, collection, doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';


const PatientDetailsScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [problem, setProblem] = useState('');
  const [userdetails, setUserdetails] = useState(null);
  const { doctorName, appointmentType, time, date } = route.params;
  const [age, setAge] = useState('');

  const getUserdetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Patients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserdetails(data);
          
          // Calculate age based on date of birth
          if (data.dateOfBirth) {
            let birthDate;
            
            // Check if dateOfBirth is a Firestore Timestamp
            if (data.dateOfBirth instanceof Object && data.dateOfBirth.toDate) {
              birthDate = data.dateOfBirth.toDate();
            } else {
              birthDate = new Date(data.dateOfBirth);
            }
  
            if (!isNaN(birthDate.getTime())) { // Ensure it's a valid date
              const currentYear = new Date().getFullYear();
              const birthYear = birthDate.getFullYear();
              const calculatedAge = currentYear - birthYear;
              setAge(calculatedAge.toString());
            } else {
              console.error("Invalid date format for dateOfBirth");
            }
          }
        } else {             
          toast.show('Details not found', { type: 'danger' }); 
        }
      } else {           
        console.log('User not logged in');
      }
    });
  };

  useEffect(() => {
      getUserdetails();
  }, []);

  const submitappointmentdetails = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Appointments"), {
        PatientName: userdetails?.name,
        Gender: userdetails?.gender,
        Age: age,
        // Location: userdetails?.location,
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
          <View style={styles.input}>
            <Text style={styles.title2}>{userdetails?.Name}</Text>
          </View>         

          <Text style={styles.title}>Gender</Text>
          <View style={styles.input}>
            <Text style={styles.title2}>{userdetails?.gender}</Text>
          </View>            
          
          <Text style={styles.title}>Age</Text>
          <View style={styles.input}>
            <Text style={styles.title2}>{age}</Text>
          </View>   
         
          <Text style={styles.title}>Location</Text>
          <View style={styles.input}>
            <Text style={styles.title2}>{userdetails?.location}</Text>
          </View>           

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
  title2: {
    fontSize: 18,
    marginBottom: 10, 
  },  
  input: {
    height: 50,
    borderColor: '#164e63',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingTop: 10,
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

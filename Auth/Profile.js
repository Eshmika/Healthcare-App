// Screens/SignUpScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot  } from '@firebase/firestore';



const Profile = ({ navigation }) => {
  const [userdetails, setUserdetails] = useState(null);
  const toast = useToast();
  const [age, setAge] = useState('');  

  const getUserdetails = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(db, "Patients", user.uid);

        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
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
        });

        // Clean up the listener on component unmount
        return () => unsubscribe();
      } else {
        console.log('User not logged in');
      }
    });
  };

  useEffect(() => {
    const unsubscribe = getUserdetails();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  async function logout(){
    try{
        await auth.signOut();
        toast.show('Logged out successfully', { type: 'success' });
        navigation.navigate('Login');
    }catch(error){
        console.log(error);
        toast.show('Error logging out', { type: 'danger' });
    }
  } 

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={{ marginBottom: 20 }} />

      <ScrollView >

      <Text style={styles.label1}>Full Name</Text>
      <Text style={styles.label2}>{userdetails?.Name}</Text>
      <View style={{ marginBottom: 20 }} />

      <Text style={styles.label1}>Patient ID</Text>
      <Text style={styles.label2}>{userdetails?.patientId}</Text>
      <View style={{ marginBottom: 20 }} />

      <Text style={styles.label1}>Age</Text>
      <Text style={styles.label2}>{age}</Text>
      <View style={{ marginBottom: 20 }} />  

      <Text style={styles.label1}>Gender</Text>
      <Text style={styles.label2}>{userdetails?.gender}</Text>
      <View style={{ marginBottom: 20 }} />  

      <Text style={styles.label1}>Email</Text>
      <Text style={styles.label2}>{userdetails?.ContactInfo.email}</Text>
      <View style={{ marginBottom: 20 }} />

      <Text style={styles.label1}>Phone Number</Text>
      <Text style={styles.label2}>{userdetails?.ContactInfo.phone}</Text>
      <View style={{ marginBottom: 20 }} />  

      <Text style={styles.label1}>Location</Text>
      <Text style={styles.label2}>{userdetails?.location}</Text>
      <View style={{ marginBottom: 20 }} />  

      <Text style={styles.label1}>Height</Text>
      <Text style={styles.label2}>{userdetails?.height}</Text>
      <View style={{ marginBottom: 20 }} /> 

      <Text style={styles.label1}>Weight</Text>
      <Text style={styles.label2}>{userdetails?.weight}</Text>
      <View style={{ marginBottom: 20 }} />   

      <Text style={styles.label1}>Emergency Contact</Text>
      <Text style={styles.label1}>Name</Text>
      <Text style={styles.label2}>{userdetails?.EmergencyContact.name}</Text>
      <View style={{ marginBottom: 20 }} />      

      <Text style={styles.label1}>Phonenumber</Text>
      <Text style={styles.label2}>{userdetails?.EmergencyContact.phone}</Text>
      <View style={{ marginBottom: 20 }} />       

      <Text style={styles.label1}>Relationship</Text>
      <Text style={styles.label2}>{userdetails?.EmergencyContact.relationship}</Text>
      <View style={{ marginBottom: 20 }} />       

      <View style={{ marginBottom: 20 }} />
      <View style={styles.buttonContainer}>
        <Button title="Update Details" onPress={() => navigation.navigate('Update Profile')} />
      </View> 

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} />
      </View>      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#0891B2', 
  },
  label1: {
    fontSize: 20,
    color: '#0891B2', 
    marginBottom: 5,
    fontWeight: 'bold',
  },  
  label2: {
    fontSize: 18,
    color: '#333', 
    marginBottom: 5,
    marginLeft: 15,
  },  
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Profile;

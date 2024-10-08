// Screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Make sure this path is correct
import { useToast } from 'react-native-toast-notifications';
import { doc, setDoc } from '@firebase/firestore';


const BookAppointmentScreen = ({ navigation }) => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phonenumber, setPhonenumber] = useState('');
  // const [password, setPassword] = useState('');
  // const [reenterpassword, setReenterpassword] = useState('');
  // const toast = useToast();

  // const signUp = async () => {
  //   try {
  //     if (password !== reenterpassword) {
  //       toast.show('Passwords do not match', { type: 'danger' });                
  //       return;
  //     } else {
  //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //       const userdetails = auth.currentUser;
  //       const user = userCredential.user;
  //       if(userdetails){
  //         await setDoc(doc(db, "user_details",userdetails.uid), {
  //           name: name,
  //           email: email,
  //           phonenumber: phonenumber
  //         });
  //       }
  //       toast.show(`User signed up with email: ${user.email}`, { type: 'success' });        
  //       navigation.navigate('Home');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.show(`${error.message}`, { type: 'danger' });      
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dr. Anjana Gayantha</Text>
      <View style={{ marginBottom: 20 }} />

      <View style={styles.cardspace}>
        <View style={styles.card}>
          <View>
            <Image 
              style={styles.cardleft} 
              source={require('../assets/doctor.png')} 
            />
          </View>     
          <View>
            <Text style={[styles.cardright, { fontWeight: 'bold' }]}>Dr. Anjana Gayantha</Text>
            <View style={{ borderWidth:1, marginLeft:10, width:190 }} />   
            <View style={{ marginBottom: 8 }} /> 
            <Text style={styles.cardright}>Surgeon</Text>   
            <Text style={styles.cardright}>Base Hospital Colombo</Text>  
            <View style={{ marginBottom: 20 }} /> 
            <Text style={styles.cardright}>Time: 6.00 - 9.00 p.m.</Text>   
          </View>     
        </View>
      </View>
      <View style={{ marginBottom: 30 }} /> 
      
      <Text style={styles.title}>Appointment Type</Text>
      <View style={{ marginBottom: 10 }} /> 
      <View style={styles.typespace}>
        <TouchableOpacity style={styles.typebtn} >
          <Text>Home visit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typebtn} >
          <Text>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typebtn} >
          <Text>Hospital</Text>
        </TouchableOpacity>     
      </View>
      <View style={{ marginBottom: 30 }} /> 

      <Text style={styles.title}>Select Date</Text>
      <View style={{ marginBottom: 30 }} />

      <Text style={styles.title}>Available Times</Text>
      <View style={styles.typespace}>
        <TouchableOpacity style={styles.typebtn} >
          <Text>6.00-7.00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typebtn} >
          <Text>7.00-8.00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typebtn} >
          <Text>8.00-9.00</Text>
        </TouchableOpacity>     
      </View>
      <View style={{ marginBottom: 40 }} />
      <TouchableOpacity style={styles.typebtn} >
        <Text>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingTop: 40,
    padding: 20,
    // backgroundColor: '#f5f5f5', 
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0f747d',     
  },
  cardspace: {
    alignItems: 'center',   
  },
  card: {
    padding: 13,  
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    width: '85%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
  },
  cardleft:{
    display: 'flex',    
    backgroundColor: '#0f747d',   
    borderRadius: 320,
    width: 90,
    height: 90,
  },
  cardright:{
    display: 'flex',
    marginLeft: 10,
    Width: '50%',
  },
  typespace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typebtn:{
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
    width: '25%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  label: {
    fontSize: 16,
    color: '#333', 
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 8, 
  },  
});

export default BookAppointmentScreen;

// Screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; 
import { doc, setDoc, getDoc, updateDoc, increment } from '@firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [reenterpassword, setReenterpassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const generatePatientId = async () => {
    // Get the counter document from Firestore
    const counterDoc = doc(db, "counters", "patientIDCounter");
    const counterSnapshot = await getDoc(counterDoc);
    
    let currentCount = 0;
    if (counterSnapshot.exists()) {
      currentCount = counterSnapshot.data().count || 0;
    }
  
    // Increment the counter by 1
    const newCount = currentCount + 1;
    const formattedId = `PID${String(newCount).padStart(3, '0')}`; 
  
    // Update the counter in Firestore
    await updateDoc(counterDoc, {
      count: increment(1)
    });
  
    return formattedId;
  }
  
  const signUp = async () => {
    try {
      if (password !== reenterpassword) {
        console.log("Passwords do not match");
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userdetails = auth.currentUser;
        const user = userCredential.user;
  
        const patientId = await generatePatientId(); // Generate formatted patient ID
  
        if (userdetails) {
            await setDoc(doc(db, "Patients", userdetails.uid), {
            patientId: patientId,
            Name: name,
            ContactInfo: {
              email: email,
              phone: phonenumber
            },
            dateOfBirth: new Date(dateOfBirth), 
            gender: gender
            });
        }
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.journalTitle}>Sign Up</Text>
        <View style={{ marginBottom: 20 }} />

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={setPhonenumber}
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Re-enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          value={reenterpassword}
          onChangeText={setReenterpassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={signUp} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0891B2',
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
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#0891B2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  journalTitle: {
    fontSize: 32,
    color: '#0891B2',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignUpScreen;

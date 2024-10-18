import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

const UpdateProfile = ({ navigation }) => {
  const [userdetails, setUserdetails] = useState(null);
  const [age, setAge] = useState('');
  const [fullName, setFullName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
  const toast = useToast();

  const getUserdetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Patients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserdetails(data);
          
          // Set fields for editing
          setFullName(data.Name);
          setPatientId(data.patientId);
          setGender(data.gender);
          setEmail(data.ContactInfo.email);
          setPhone(data.ContactInfo.phone);
          setLocation(data.location);
          setWeight(data.weight);
          setHeight(data.height);
          setEmergencyContactName(data.EmergencyContact.name);
          setEmergencyContactPhone(data.EmergencyContact.phone);
          setEmergencyContactRelationship(data.EmergencyContact.relationship);
          
          // Calculate age based on date of birth
          if (data.dateOfBirth) {
            let birthDate;
            if (data.dateOfBirth instanceof Object && data.dateOfBirth.toDate) {
              birthDate = data.dateOfBirth.toDate();
            } else {
              birthDate = new Date(data.dateOfBirth);
            }
  
            if (!isNaN(birthDate.getTime())) {
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

  const handleUpdateDetails = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Patients", user.uid);
        await updateDoc(docRef, {
          Name: fullName,
          gender: gender,
          "ContactInfo.email": email,
          "ContactInfo.phone": phone,
          location: location,
          weight: weight,
          height: height,
          "EmergencyContact.name": emergencyContactName,
          "EmergencyContact.phone": emergencyContactPhone,
          "EmergencyContact.relationship": emergencyContactRelationship,
        });

        toast.show('Profile updated successfully', { type: 'success' });
        navigation.navigate('Profile');  
      } else {
        toast.show('User not logged in', { type: 'danger' });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.show('Error updating profile', { type: 'danger' });
    }
  };

 
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
            <Text style={styles.title}>Profile</Text>
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={fullName}
              onChangeText={setFullName}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Patient ID</Text>
            <TextInput
              style={styles.textInput}
              value={patientId}
              editable={false} 
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Age</Text>
            <TextInput
              style={styles.textInput}
              value={age}
              editable={false} 
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Gender</Text>
            <TextInput
              style={styles.textInput}
              value={gender}
              onChangeText={setGender}
              editable={false}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={false}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Location</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Height</Text>
            <TextInput
              style={styles.textInput}
              value={height}
              onChangeText={setHeight}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Weight</Text>
            <TextInput
              style={styles.textInput}
              value={weight}
              onChangeText={setWeight}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Emergency Contact</Text>
            <Text style={styles.label1}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={emergencyContactName}
              onChangeText={setEmergencyContactName}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Phone number</Text>
            <TextInput
              style={styles.textInput}
              value={emergencyContactPhone}
              onChangeText={setEmergencyContactPhone}
            />
            <View style={{ marginBottom: 20 }} />

            <Text style={styles.label1}>Relationship</Text>
            <TextInput
              style={styles.textInput}
              value={emergencyContactRelationship}
              onChangeText={setEmergencyContactRelationship}
            />
            <View style={{ marginBottom: 20 }} />

            <View style={{ marginBottom: 20 }} />

            <View style={styles.buttonContainer}>
              <Button title="Save Details" onPress={handleUpdateDetails}  />
            </View>             
          
        </ScrollView>
      </KeyboardAvoidingView>
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
  textInput: {
    fontSize: 18,
    color: '#333', 
    marginBottom: 5,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default UpdateProfile;

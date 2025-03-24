import { addDoc, collection, doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import RNPickerSelect from 'react-native-picker-select';

const InsuranceFormScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [insuranceId, setInsuranceId] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insuranceType, setInsuranceType] = useState('');
  const [reason, setReason] = useState('');
  const [userdetails, setUserdetails] = useState(null);
  const { price } = route.params;


  const insuranceTypes = [
    { label: 'Health Insurance - Individual', value: 'Health Insurance - Individual' },
    { label: 'Health Insurance - Family Floater', value: 'Health Insurance - Family Floater' },
    { label: 'Health Insurance - Critical Illness', value: 'Health Insurance - Critical Illness' },
    { label: 'Health Insurance - Senior Citizen', value: 'Health Insurance - Senior Citizen' },
  ];
  
  // Fetch user details (Patient Name and Amount)
  const getUserdetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Patients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserdetails(data);
        } else {
          console.log('Details not found');
        }
      } else {
        console.log('User not logged in');
      }
    });
  };

  useEffect(() => {
    getUserdetails();
  }, []);

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces are allowed
    const newErrors = {};
  
    if (!insuranceId.trim()) {
      newErrors.insuranceId = "Insurance ID is required.";
    }
    if (!insuranceName.trim()) {
      newErrors.insuranceName = "Insurance Name is required.";
    } else if (!nameRegex.test(insuranceName.trim())) {
      newErrors.insuranceName = "Insurance Name can only contain letters, spaces, hyphens, and periods.";
    }
    if (!insuranceType.trim()) {
      newErrors.insuranceType = "Insurance Type is required.";
    }
    if (!reason.trim()) {
      newErrors.reason = "Reason for insurance claim is required.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };
  

  const submitInsuranceDetails = async () => {
    if (!validateFields()) return; // Validate before submission

    try {
      const insuranceDetails = {
        patientName: userdetails?.Name,
        insuranceId: insuranceId,
        insuranceName: insuranceName,
        insuranceType: insuranceType,
        price: price,
        reason: reason,
        status: 'Pending',
      };

      await addDoc(collection(db, "Insurance"), insuranceDetails);

      setModalVisible(true);
    } catch (error) {
      console.error("Error submitting insurance details:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Patient Name</Text>
          <View style={styles.input}>
            <Text style={styles.title2}>{userdetails?.Name}</Text>
          </View>

          <Text style={styles.title}>Insurance ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Insurance ID"
            value={insuranceId}
            onChangeText={setInsuranceId}
          />

<Text>{errors.insuranceId && <Text style={styles.error}>{errors.insuranceId}</Text>}</Text>

          <Text style={styles.title}>Insurance Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Insurance Name"
            value={insuranceName}
            onChangeText={setInsuranceName}
          />
          <Text>{errors.insuranceName && <Text style={styles.error}>{errors.insuranceName}</Text>}</Text>

<Text style={styles.title}>Insurance Type</Text>
          <RNPickerSelect
            onValueChange={(value) => setInsuranceType(value)}
            items={insuranceTypes}
            style={{
              inputAndroid: {
                color: 'black',
                padding: 10,
                borderColor: '#164e63',
                borderWidth: 2,
                borderRadius: 8,
                backgroundColor: '#fff',
              },
              inputIOS: {
                color: 'black',
                padding: 10,
                borderColor: '#164e63',
                borderWidth: 2,
                borderRadius: 8,
                backgroundColor: '#fff',
              },
            }}
            placeholder={{
              label: "Select Insurance Type",
              value: null,
            }}
            value={insuranceType}
          />

<Text>{errors.insuranceType && <Text style={styles.error}>{errors.insuranceType}</Text>}</Text>


          <Text style={styles.title}>Amount</Text>
          <View style={styles.input}>
            <Text style={styles.title2}>Rs.{price}.00</Text>
          </View>

          <Text style={styles.title}>Reason</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter the reason for insurance claim"
            value={reason}
            onChangeText={setReason}
            multiline={true}
            numberOfLines={4}
          />

<Text>{errors.reason && <Text style={styles.error}>{errors.reason}</Text>}</Text>

          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <TouchableOpacity style={styles.continuebtn} onPress={submitInsuranceDetails}>
              <Text style={{ color: '#fff', fontSize: 19 }}>Request Insurance</Text>
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
                <Text style={styles.modalText}>Thank You!</Text>
                <Text style={styles.modalSubText}>Your insurance details were submitted successfully.</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('BottomTabs');
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
    width: 250,
    height: 50,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
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
  errorText: {
    color: 'red',
},
});

export default InsuranceFormScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

  const [selectedAppointment, setSelectedAppointment] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null); 

  const appointmentType = ['Home visit', 'Online', 'Hospital'];  
  const availableTime = ['6.00-7.00', '7.00-8.00', '8.00-9.00'];  
  
  const handleAppointmentCardPress = (type) => {
    setSelectedAppointment(type); 
  };
  
  const handleTimeCardPress = (time) => {
    setSelectedTime(time); 
  };

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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20, marginTop: 10,}}>
          {appointmentType.map((type, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.typebtn, 
                selectedAppointment === type && styles.timeselectedCard 
              ]}
              onPress={() => handleAppointmentCardPress(type)} 
            >
              <Text 
                style={[
                  styles.timecardText, 
                  selectedAppointment === type && styles.timeselectedcardText 
                ]}
              >{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

      <View style={{ marginBottom: 30 }} /> 

      <Text style={styles.title}>Select Date</Text>
      <View style={{ marginBottom: 30 }} />

      <Text style={styles.title}>Available Times</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 20, marginTop: 10,}}>
        {availableTime.map((time, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.typebtn, 
              selectedTime === time && styles.timeselectedCard 
            ]}
            onPress={() => handleTimeCardPress(time)} 
          >
            <Text 
              style={[
                styles.timecardText, 
                selectedTime === time && styles.timeselectedcardText 
              ]}
            >{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 40, alignItems:'center',}} >
        <TouchableOpacity style={styles.continuebtn} onPress={() => navigation.navigate('Patient Details')}>
          <Text style={{ color: '#fff', fontSize: 19, }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0891b2',     
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
  typebtn:{
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    borderColor: '#000',
    borderWidth: 1,
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
    padding: 8,
  },  
  timeselectedCard: {
    backgroundColor: '#67e8f9',
  },
  timecardText: {
    textAlign: 'center',
  },
  timeselectedcardText: {
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
  }
});

export default BookAppointmentScreen;

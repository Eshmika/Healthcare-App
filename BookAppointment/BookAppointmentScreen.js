import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, } from 'react-native';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const appointmentType = ['Home visit', 'Online', 'Hospital'];  
  const availableTime = ['6.00-7.00', '7.00-8.00', '8.00-9.00'];  

  const getCurrentWeekDates = () => {
    const startOfWeek = moment().startOf('isoWeek'); 
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.clone().add(i, 'days'));
    }
    return weekDates;
  };

  const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
  
  const handleAppointmentCardPress = (type) => {
    setSelectedAppointment(type); 
  };
  
  const handleTimeCardPress = (time) => {
    setSelectedTime(time); 
  };

  const handleContinuePress = () => {
    if (selectedAppointment && selectedTime && selectedDate) {
      navigation.navigate('Patient Details');
    } else {      
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dr. Anjana Gayantha</Text>
      <View style={{ marginBottom: 20 }} />

      <View style={styles.cardspace}>
        <View style={styles.card}>
          <View style={{justifyContent:'center' }}>
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
            {/* <View style={{ marginBottom: 20 }} />  */}
            <Text style={styles.cardright}>Doctor fee: RS </Text>   
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

      <View style={styles.weekContainer}>
          {weekDates.map((date, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.dateCard, 
                selectedDate === date.format('YYYY-MM-DD') && styles.selectedDateCard
              ]}
              onPress={() => setSelectedDate(date.format('YYYY-MM-DD'))}
            >
              <Text style={styles.dateText}>{date.format('MMM')}</Text>
              <View style={{ marginBottom: 2 }} />
              <Text style={styles.dateText}>{date.format('ddd')}</Text>  
              <View style={{ backgroundColor:'#fff', borderRadius: 15, width: 30, height: 30, justifyContent:'center', marginTop:5, }}>
                <Text style={styles.dateText2}>{date.format('D')}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>

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
      <TouchableOpacity 
          style={styles.continuebtn} 
          onPress={handleContinuePress} 
        >
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
              <Text style={styles.modalText}>Incomplete Selection</Text>
              <Text style={styles.modalSubText}>Please select an appointment type, date, and time before continuing.</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  // navigation.navigate('BottomTabs');  
                }}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    fontWeight: 'bold',
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

  weekContainer: {
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateCard: {
    backgroundColor: '#cffafe',
    padding: 8,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
  selectedDateCard: {
    backgroundColor: '#67e8f9',
  },
  dateText: {
    textAlign: 'center',
  },
  dateText2: {
    textAlign: 'center',
    fontSize: 18,
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
  modalIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8B0000',
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 17,    
    marginBottom: 20,
    textAlign: 'center',
  },  
  modalButton: {
    backgroundColor: '#7C0A02', 
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

export default BookAppointmentScreen;

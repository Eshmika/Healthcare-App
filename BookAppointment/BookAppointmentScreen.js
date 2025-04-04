import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, } from 'react-native';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';

const BookAppointmentScreen = ({ route, navigation }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { doctorId } = route.params;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [hospital, setHospital] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const getDoctordetails = useCallback(async () => {
    try {
        const response = await getDoc(doc(db, "Doctors", doctorId));
        if (response.exists()) {
            const data = response.data();
            setName(data.doctor_name);
            setType(data.doctor_type);
            setHospital(data.hospital);
            setPrice(data.Price);
            setimageUrl(data.imageUrl);            
        } else {
            console.log("No such data found!");
        }
    } catch (error) {
        console.error(error);
    }
  }, [doctorId]);

  useEffect(() => {
    getDoctordetails();
  }, [doctorId, getDoctordetails]);

  const appointmentType = ['Home visit', 'Online', 'Hospital'];  
  const availableTime = ['6.00-7.00', '7.00-8.00', '8.00-9.00'];  

  const getCurrentWeekDates = () => {
    const today = moment();
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(today.clone().add(i, 'days'));
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
      navigation.navigate('Patient Details', {doctorName: name, appointmentType: selectedAppointment, time: selectedTime, date: selectedDate, price: price});
    } else {      
      setModalVisible(true);
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={{ marginBottom: 20 }} />

      <View style={styles.cardspace}>
        <View style={styles.card}>
          <View style={{justifyContent:'center' }}>            
            <Image 
              style={styles.cardleft}
              source={imageUrl ? { uri: imageUrl } : require('../assets/Personloading.gif')}
          />
          </View>     
          <View>
            <Text style={[styles.cardright, { fontWeight: 'bold', textDecorationLine:"underline" }]}>{name}</Text>
            <View style={{ marginBottom: 8 }} /> 
            <Text style={styles.cardright}>{type}</Text>   
            <Text style={styles.cardright}>{hospital}</Text>  
            {/* <View style={{ marginBottom: 20 }} />  */}
            <Text style={styles.cardright2}>Doctor fee: RS {price}</Text>   
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
        {weekDates.map((date, index) => {
          const isBeforeToday = date.isBefore(moment(), 'day');
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.dateCard, 
                selectedDate === date.format('YYYY-MM-DD') && styles.selectedDateCard,
                isBeforeToday && styles.disabledDateCard 
              ]}
              onPress={() => !isBeforeToday && setSelectedDate(date.format('YYYY-MM-DD'))}
              disabled={isBeforeToday} 
            >
              <Text style={[styles.dateText, isBeforeToday && styles.disabledText]}>{date.format('MMM')}</Text>
              <View style={{ marginBottom: 2 }} />
              <Text style={[styles.dateText, isBeforeToday && styles.disabledText]}>{date.format('ddd')}</Text>  
              <View style={{ backgroundColor:'#fff', borderRadius: 15, width: 30, height: 30, justifyContent:'center', marginTop:5, }}>
                <Text style={[styles.dateText2, isBeforeToday && styles.disabledText]}>{date.format('D')}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    color: '#0891B2',     
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
    borderRadius: 320,
    width: 90,
    height: 90,
  },
  cardright:{
    display: 'flex',
    marginLeft: 10,
    Width: '50%',
  },  
  cardright2:{
    display: 'flex',
    marginLeft: 10,
    fontWeight: 'bold',
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
    backgroundColor: '#0891B2',    
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
    borderRadius: 13,
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
  disabledDateCard: {
    backgroundColor: '#d3d3d3', 
    borderColor: '#d3d3d3', 
  },
  disabledText: {
    color: '#a9a9a9', 
  },
});

export default BookAppointmentScreen;

import { collection, doc, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebaseConfig';

const DoctorHomeScreen = ({ navigation }) => {
  const [doctor, setDoctor] = useState([]);   
  const [searchdoctor, setSearchDoctor] = useState('');
  const [loading, setLoading] = useState(true);

  const getGuidedetails = async () => {
    try {
      const response = await getDocs(collection(db, "Doctors")); 
      const doctorList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctor(doctorList);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching guides:', error);
      setLoading(false);
    }
  };  

  useEffect(() => {
    getGuidedetails();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circlecontainer}>
        <View style={{ width: 420, height: 280, borderRadius: 60, backgroundColor: '#0891B2', marginTop:-120,}}>
          <View style={{ marginTop: 150 }} />

          <View style={{flexDirection: 'row',}}>
            <View>
              <Text style={styles.titlename}>Hi Eshmika!</Text>
              <Text style={styles.title}>Find Your Doctor</Text>
            </View>                        
           
          </View>
          
          <View style={{alignItems: 'center',}}>
            <View style={styles.searchbar}>  
              <Icon name="search" size={20} color="#677294" />
              <TextInput
                style={styles.input}
                placeholder="Search...."
                onChangeText={setSearchDoctor}               
              />
              <Icon name="close" size={20} color="#677294" />
            </View>
          </View>          
        </View>
      </View>
      
      {/* Show loading spinner while fetching data */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#39170C" />
          <Text>Loading doctors...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {doctor.filter(doctor => doctor.doctor_name.toLowerCase().includes(searchdoctor.toLowerCase())).map(doctor => (
              <TouchableOpacity key={doctor.id} onPress={() => navigation.navigate('Travel Guide Details', { doctorId: doctor.id })}>
                <View style={styles.cards}>
                  <Image 
                    style={{ width: 170, height: 150, borderRadius: 8, marginBottom: 5 }} 
                    source={{ uri: doctor.imageUrl }} 
                  />
                  <Text style={styles.cardname}>{doctor.doctor_name}</Text>
                  <Text style={styles.cardname}>{doctor.doctor_type}</Text>
                  <Text style={styles.cardname}>{doctor.hospital}</Text>
                  <Text style={styles.cardname}>{doctor.availability}</Text>               
                  
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    paddingTop: 40,
    padding: 20,
    backgroundColor: '#fff', 
    // alignItems: 'center',
  },
  circlecontainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft: 20,    
    color: '#fff',     
  },
  titlename: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 3,
    paddingLeft: 20,    
    color: '#fff',     
  },
  searchbar:{
    backgroundColor: '#fff', 
    marginTop: 25,
    width: 350,
    height: 50,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15, 
  },
  input:{
    paddingLeft: 15,
    width: 280,
    fontSize: 20,
  },
  title2: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 5,
    paddingLeft: 20,    
    color: '#333333',      
    flexDirection: 'row',
  },
  cards:{
    backgroundColor: '#fff', 
    marginTop: 15,
    width: 175,
    height: 240,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  cardname: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333333',      
  },
  cardlanguage: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 5, 
    color: '#677294',      
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default DoctorHomeScreen;

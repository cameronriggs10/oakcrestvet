import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PetStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<PetStackParamList, 'PetDetail'>;

const PetDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { petId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text>Pet Image</Text>
      </View>
      <Text style={styles.name}>Buddy</Text>
      <Text style={styles.info}>Species: Dog</Text>
      <Text style={styles.info}>Breed: Golden Retriever</Text>
      <Text style={styles.info}>Age: 5 years</Text>

      <View style={styles.actions}>
        <Button 
          title="View Medical Records" 
          onPress={() => navigation.navigate('MedicalRecords', { petId })} 
        />
        <View style={{ height: 10 }} />
        <Button 
          title="Book Appointment" 
          onPress={() => navigation.navigate('BookingStack')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  actions: {
    marginTop: 30,
    width: '100%',
  },
});

export default PetDetailScreen;

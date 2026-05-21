import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PetStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<PetStackParamList, 'MedicalRecords'>;

const MOCK_RECORDS = [
  { id: '1', date: '2023-10-15', description: 'Annual Checkup', provider: 'Dr. Smith' },
  { id: '2', date: '2023-05-20', description: 'Rabies Vaccination', provider: 'Dr. Jones' },
];

const MedicalRecordsScreen: React.FC<Props> = ({ route }) => {
  const { petId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medical History for Pet {petId}</Text>
      <FlatList
        data={MOCK_RECORDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.provider}>{item.provider}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2E7D32',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  provider: {
    fontSize: 14,
    color: '#666',
  },
});

export default MedicalRecordsScreen;

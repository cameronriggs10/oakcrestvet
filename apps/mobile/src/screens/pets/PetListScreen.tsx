import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PetStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<PetStackParamList, 'PetList'>;

const MOCK_PETS = [
  { id: '1', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever' },
  { id: '2', name: 'Mittens', species: 'Cat', breed: 'Tabby' },
];

const PetListScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_PETS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PetDetail', { petId: item.id })}
          >
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petInfo}>{item.species} • {item.breed}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default PetListScreen;

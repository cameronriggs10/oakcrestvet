import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PetStackParamList } from '../types/navigation';
import PetListScreen from '../screens/pets/PetListScreen';
import PetDetailScreen from '../screens/pets/PetDetailScreen';
import MedicalRecordsScreen from '../screens/pets/MedicalRecordsScreen';

const Stack = createNativeStackNavigator<PetStackParamList>();

const PetNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PetList" component={PetListScreen} options={{ title: 'My Pets' }} />
      <Stack.Screen name="PetDetail" component={PetDetailScreen} options={{ title: 'Pet Details' }} />
      <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} options={{ title: 'Medical Records' }} />
    </Stack.Navigator>
  );
};

export default PetNavigator;

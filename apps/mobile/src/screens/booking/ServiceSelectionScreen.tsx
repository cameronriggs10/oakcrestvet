import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ServiceSelectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Service Selection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceSelectionScreen;

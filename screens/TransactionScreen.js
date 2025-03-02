import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: '100%'
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 32,
    color: '#34495E',
    letterSpacing: 0.5,
  },
});
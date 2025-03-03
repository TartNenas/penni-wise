import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '../components/Dropdown';

export default function PaymentScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Shopping', icon: 'cart' },
    { id: 2, name: 'Food', icon: 'restaurant' },
    { id: 3, name: 'Transportation', icon: 'bus' },
    { id: 4, name: 'Entertainment', icon: 'game-controller' },
    { id: 5, name: 'Bills', icon: 'receipt' },
    { id: 6, name: 'Others', icon: 'ellipsis-horizontal' },
  ];

  const handleTransaction = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!description) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    try {
      const transaction = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        category: selectedCategory.name,
        description,
        date: new Date().toISOString(),
        type: 'expense'
      };

      // Get existing transactions
      const existingTransactions = await AsyncStorage.getItem('transactions');
      const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];

      // Add new transaction
      transactions.unshift(transaction);

      // Save updated transactions
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // Update balance
      const currentBalance = await AsyncStorage.getItem('balance');
      const newBalance = parseFloat(currentBalance) - parseFloat(amount);
      await AsyncStorage.setItem('balance', newBalance.toString());

      // Reset form
      setAmount('');
      setDescription('');
      setSelectedCategory(null);

      Alert.alert('Success', 'Transaction saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Transaction</Text>

      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Amount (RM)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Dropdown
          label="Category"
          placeholder="Select a category"
          options={categories}
          selectedOption={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleTransaction}
        >
          <Text style={styles.submitButtonText}>Save Transaction</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 32,
    color: '#34495E',
    letterSpacing: 0.5
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  inputWrapper: {
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#34495E',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  submitButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
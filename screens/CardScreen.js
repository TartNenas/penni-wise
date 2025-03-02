import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function CardScreen() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadBalance();
  }, []);

  const loadBalance = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem('balance');
      if (savedBalance !== null) {
        setBalance(parseFloat(savedBalance));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load balance');
    }
  };

  const handleDeposit = async () => {
    if (amount && !isNaN(amount)) {
      try {
        const newBalance = balance + parseFloat(amount);
        await AsyncStorage.setItem('balance', newBalance.toString());
        setBalance(newBalance);
        setAmount('');
        Alert.alert('Success', 'Deposit successful!');
      } catch (error) {
        Alert.alert('Error', 'Failed to process deposit');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid amount');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Cards</Text>
        
        <LinearGradient
          colors={['#6C5CE7', '#8E7CF3']}
          style={styles.card}
        >
          <Text style={styles.cardLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>RM {balance.toFixed(2)}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardNumber}>**** **** **** 4242</Text>
            <View style={styles.cardChip} />
          </View>
        </LinearGradient>

        <View style={styles.actionSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.depositButton]}
              onPress={handleDeposit}
            >
              <Ionicons name="arrow-down" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.payButton]}
              onPress={() => Alert.alert('Coming Soon', 'Payment feature will be available soon!')}
            >
              <Ionicons name="card" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 32,
    color: '#34495E',
    letterSpacing: 0.5
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    height: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  },
  cardLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 16,
    fontFamily: 'System'
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'System'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardNumber: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 16,
    letterSpacing: 4,
    fontFamily: 'System'
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 6,
    opacity: 0.8
  },
  actionSection: {
    marginTop: 20
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#34495E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  depositButton: {
    backgroundColor: '#6C5CE7'
  },
  payButton: {
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  }
});
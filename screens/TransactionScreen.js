import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionScreen() {
  const [transactions] = useState([
    {
      id: '1',
      date: 'Today',
      transactions: [
        {
          id: 't1',
          type: 'expense',
          category: 'Shopping',
          amount: -120.50,
          description: 'Grocery Shopping',
          time: '14:30'
        },
        {
          id: 't2',
          type: 'income',
          category: 'Salary',
          amount: 3000.00,
          description: 'Monthly Salary',
          time: '09:00'
        }
      ]
    },
    {
      id: '2',
      date: 'Yesterday',
      transactions: [
        {
          id: 't3',
          type: 'expense',
          category: 'Transportation',
          amount: -25.00,
          description: 'Taxi Ride',
          time: '18:45'
        },
        {
          id: 't4',
          type: 'expense',
          category: 'Food',
          amount: -35.80,
          description: 'Restaurant Dinner',
          time: '20:15'
        }
      ]
    }
  ]);

  const renderTransactionItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.transactionCard}>
      <View style={styles.transactionIconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: item.type === 'income' ? '#4CAF50' : '#6C5CE7' }]}>
          <Ionicons
            name={item.type === 'income' ? 'arrow-down' : 'arrow-up'}
            size={20}
            color="#FFFFFF"
          />
        </View>
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={[styles.transactionAmount, { color: item.type === 'income' ? '#4CAF50' : '#6C5CE7' }]}>
            {item.type === 'income' ? '+' : ''}{item.amount.toFixed(2)} RM
          </Text>
        </View>
        <View style={styles.transactionFooter}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={styles.transactionTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      {transactions.map(group => (
        <View key={group.id} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{group.date}</Text>
          {group.transactions.map(transaction => renderTransactionItem(transaction))}
        </View>
      ))}
    </ScrollView>
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
  dateGroup: {
    marginBottom: 24
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 16
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  transactionIconContainer: {
    marginRight: 16
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  transactionDetails: {
    flex: 1
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E'
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600'
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  transactionDescription: {
    fontSize: 14,
    color: '#94A3B8'
  },
  transactionTime: {
    fontSize: 14,
    color: '#94A3B8'
  }
});
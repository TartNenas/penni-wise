import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);

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

  const renderBarChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const values = [300, 450, 600, 980, 550, 750];
    const maxValue = Math.max(...values);

    return (
      <View style={styles.chartContainer}>
        {months.map((month, index) => (
          <View key={month} style={styles.barWrapper}>
            <View 
              style={[styles.bar, { 
                height: `${(values[index] / maxValue) * 100}%`,
                backgroundColor: month === 'May' ? '#FFE600' : '#E0E7FF'
              }]} 
            />
            <Text style={styles.barLabel}>{month}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Insights</Text>

        <LinearGradient
          colors={['#6C5CE7', '#8E7CF3']}
          style={styles.overviewCard}
        >
          <Text style={styles.overviewLabel}>Total Balance</Text>
          <Text style={styles.overviewAmount}>RM {balance.toFixed(2)}</Text>
          {renderBarChart()}
        </LinearGradient>

        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.categoryCard}>
          <View style={styles.categoryRow}>
            <Ionicons name="cart-outline" size={24} color="#34495E" />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Shopping</Text>
              <Text style={styles.transactionCount}>50 transactions</Text>
            </View>
            <Text style={styles.categoryAmount}>$1,456.00</Text>
          </View>
        </View>

        <View style={styles.categoryCard}>
          <View style={styles.categoryRow}>
            <Ionicons name="card-outline" size={24} color="#34495E" />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>Banking</Text>
              <Text style={styles.transactionCount}>12 transactions</Text>
            </View>
            <Text style={styles.categoryAmount}>$1,234.00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 24,
  },
  overviewCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  overviewLabel: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 16,
    marginBottom: 8,
  },
  overviewAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600',
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 16,
  },
  barWrapper: {
    alignItems: 'center',
    width: '14%',
  },
  bar: {
    width: '100%',
    borderRadius: 3,
    marginBottom: 8,
  },
  barLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E',
  },
  transactionCount: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
});
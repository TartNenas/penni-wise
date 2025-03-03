import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dropdown({ 
  label, 
  placeholder, 
  options, 
  selectedOption, 
  onSelect,
  renderIcon = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 200; // Maximum height of dropdown
    Animated.timing(dropdownHeight, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    toggleDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        toggleDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[styles.selector, isOpen && styles.selectorOpen]}
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        {selectedOption ? (
          <View style={styles.selectedOption}>
            {renderIcon && selectedOption.icon && (
              <Ionicons name={selectedOption.icon} size={20} color="#6C5CE7" />
            )}
            <Text style={styles.selectedText}>{selectedOption.name}</Text>
          </View>
        ) : (
          <Text style={styles.placeholderText}>{placeholder || "Select an option"}</Text>
        )}
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#94A3B8" 
        />
      </TouchableOpacity>

      <Animated.View style={[styles.dropdown, { maxHeight: dropdownHeight }]}>
        <ScrollView 
          style={styles.optionsList}
          nestedScrollEnabled={true}
        >
          {options.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionItem}
              onPress={() => handleSelect(item)}
            >
              {renderIcon && item.icon && (
                <Ionicons name={item.icon} size={20} color="#6C5CE7" style={styles.optionIcon} />
              )}
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
  },
  selector: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectorOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#34495E',
    marginLeft: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#94A3B8',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopWidth: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  optionsList: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#34495E',
  },
});
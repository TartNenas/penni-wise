import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    status: 'Full-time',
    bio: 'Passionate about creating innovative solutions and building user-friendly applications.\nExperienced in mobile development and always eager to learn new technologies.'
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('profileData');
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => isEditing ? saveProfileData() : setIsEditing(true)}
        >
          <Ionicons
            name={isEditing ? 'checkmark' : 'create-outline'}
            size={24}
            color="#6C5CE7"
          />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#6C5CE7', '#8E7CF3']}
            style={styles.avatarGradient}
          >
            <View style={styles.avatar} />
          </LinearGradient>
        </View>
        
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={profileData.name}
            onChangeText={(text) => setProfileData({...profileData, name: text})}
            placeholder="Enter your name"
          />
        ) : (
          <Text style={styles.name}>{profileData.name}</Text>
        )}

        <View style={styles.jobContainer}>
          {isEditing ? (
            <TextInput
              style={styles.jobTitleInput}
              value={profileData.jobTitle}
              onChangeText={(text) => setProfileData({...profileData, jobTitle: text})}
              placeholder="Enter your job title"
            />
          ) : (
            <Text style={styles.jobTitle}>{profileData.jobTitle}</Text>
          )}
          
          <TouchableOpacity 
            style={styles.statusBadge}
            onPress={() => isEditing && setShowStatusOptions(!showStatusOptions)}
          >
            <Text style={styles.statusText}>{profileData.status}</Text>
          </TouchableOpacity>
          {isEditing && showStatusOptions && (
            <View style={styles.statusOptions}>
              {['Full-time', 'Part-time', 'Freelance'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.statusOption}
                  onPress={() => {
                    setProfileData({...profileData, status});
                    setShowStatusOptions(false);
                  }}
                >
                  <Text style={[styles.statusOptionText, 
                    profileData.status === status && styles.statusOptionTextSelected
                  ]}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.bioTitle}>About</Text>
        {isEditing ? (
          <TextInput
            style={styles.bioInput}
            value={profileData.bio}
            onChangeText={(text) => setProfileData({...profileData, bio: text})}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
          />
        ) : (
          <Text style={styles.bioText}>{profileData.bio}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1
  },
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
  profileCard: {
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
    elevation: 2,
    alignItems: 'center'
  },
  avatarContainer: {
    marginBottom: 16
  },
  avatarGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#E0E7FF'
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 16
  },
  jobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  jobTitle: {
    fontSize: 16,
    color: '#6C5CE7',
    fontWeight: '500',
    marginRight: 12
  },
  statusBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statusText: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '500'
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  bioText: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
    alignSelf: 'flex-start'
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '700',
    color: '#34495E',
    marginBottom: 16,
    textAlign: 'center',
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8
  },
  jobTitleInput: {
    fontSize: 16,
    color: '#6C5CE7',
    fontWeight: '500',
    marginRight: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 6
  },
  statusOptions: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2
  },
  statusOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  statusOptionText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500'
  },
  statusOptionTextSelected: {
    color: '#6C5CE7'
  },
  bioInput: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    minHeight: 100
  }
});
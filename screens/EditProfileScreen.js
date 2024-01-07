import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditProfileScreen = ({ route, navigation }) => {
  const { profileData } = route.params;

  const [username, setUsername] = useState(profileData.Gebruikersnaam);
  const [email, setEmail] = useState(profileData.Email);
  const [password, setPassword] = useState(''); // Don't pre-fill passwords
  const [bio, setBio] = useState(profileData.Bio);
  const [updateStatus, setUpdateStatus] = useState(''); // Additional state for update status

  // Assuming profileData.Profielfoto is a full URL to the user's profile picture
  const [profilePic, setProfilePic] = useState(profileData.Profielfoto);

  const handleUpdatePress = async () => {
    setUpdateStatus('updating');
    
    const userId = await AsyncStorage.getItem('userId'); // Assuming you're storing user ID in AsyncStorage
    
    // Initialize the update object with the user ID
    const updateFields = {
      Gebruikers_ID: userId,
    };
  
    // Check if each field has changed before adding it to the update object
    if (username !== profileData.Gebruikersnaam) {
      updateFields.Gebruikersnaam = username;
    }
    if (email !== profileData.Email) {
      updateFields.Email = email;
    }
    if (password) { // Only include the password if it has been entered
      updateFields.Wachtwoord = password;
    }
    if (bio !== profileData.Bio) {
      updateFields.Bio = bio;
    }
  
    // Proceed only if there's something to update
    if (Object.keys(updateFields).length > 1) { // More than just the user ID
      try {
        const response = await fetch('https://bilal.vaw.be/api.php?action=edit_profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateFields),
        });
  
        const result = await response.json();
        if (response.ok && result.success) {
          alert('Gebruiker Geupdate');
          setUpdateStatus('updated');
          // Refresh the profile screen or use a callback to update the profile state
          navigation.goBack();
        } else {
          setUpdateStatus('error');
          console.log(result); // Log the response from the server
          alert('Failed to update profile. Please try again later.');
        }
      } catch (error) {
        console.error('Network or server error:', error);
        setUpdateStatus('error');
        alert('An error occurred. Please check your internet connection and try again.');
      }
    } else {
      alert('No changes detected. Profile not updated.');
      setUpdateStatus('idle'); // Reset the status if there's nothing to update
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: profilePic }} style={styles.profileImage} />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Gebruikersnaam"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Wachtwoord"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setBio}
        value={bio}
        placeholder="Bio"
        multiline
      />
      {updateStatus === 'updating' && <Text>Updating...</Text>}
      {updateStatus === 'updated' && <Text>Profile updated successfully!</Text>}
      {updateStatus === 'error' && <Text>Failed to update profile.</Text>}
      <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerButton: {
    marginBottom: 10,
  },
  birthdateText: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default EditProfileScreen;

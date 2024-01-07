import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './ApiDatabase'; // Make sure the path to ApiDatabase.js is correct

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');

  
  const handleLogin = () => {
    loginUser(email, password)
      .then(async (data) => {
        if (data.success) {
          // Save the user ID to AsyncStorage
          await AsyncStorage.setItem('userId', data.user.Gebruikers_ID.toString());
  
          // Navigate to the Profilescreen
          navigation.navigate('Terug', { screen: 'Profile', params: { user: data.user } });
        } else {
          Alert.alert('Error', 'Incorrect email or password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/img/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Please sign in to continue.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email" // Changed from Username to Email
          value={email}
          onChangeText={setEmail} // Changed from setUsername to setEmail
          autoCapitalize="none"
          keyboardType="email-address" // Set the keyboardType for email input
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop:-190,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#606060',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1a73e8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  // Add additional styles if necessary
});

export default Login;

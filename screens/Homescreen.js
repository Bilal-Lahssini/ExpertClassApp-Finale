// WelcomeScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome in 49TheBrand</Text>
      <Text style={styles.title}>Chatapp</Text>
      <Text style={styles.subtitle}>
        Join the discussion of various topics and find people !
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Replace 'NextScreen' with the actual screen you want to navigate to
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.indicatorContainer}>
        {/* Render your indicators here */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Assuming the background is white
  },
  logo: {
    width: 150, // Set your image size
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000', // Replace with the exact color code from your design
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C5C', // Replace with the exact color code from your design
    textAlign: 'center',
    paddingHorizontal: 50,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#EFEFEF', // Replace with the exact button color from your design
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#000000', // Replace with the exact color code from your design
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    // Add styles for your indicator container
  },
  // Add styles for your indicators
});
export default Homescreen;
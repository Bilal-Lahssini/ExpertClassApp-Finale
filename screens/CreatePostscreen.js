import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [postText, setPostText] = useState('');

  const handleNext = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const currentDate = new Date().toISOString(); // Format as an ISO string
    try {
      // Check if the postText is not empty
      if (!postText) {
        console.log('Post Text is empty');
        return;
      }
  
      // Create a new post object with the required fields
      const newPost = {
        Inhoud: postText,
        Gebruikers_ID: userId,
        Datum_en_tijd: currentDate, // This should match your backend's expected field name
      };
    
      // Log the newPost object to confirm the date is included
      console.log('New post data:', newPost)
  
      // Make an HTTP POST request to your API
      const response = await fetch('https://bilal.vaw.be/api.php?action=add_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ... any other required headers like authorization
        },
        body: JSON.stringify(newPost), // Convert the newPost object to a JSON string
      });
  
      // Parse the response to get the details
      const text = await response.text(); // Get the response text
      try {
        const responseData = JSON.parse(text); // Try parsing it as JSON
  
        if (response.ok && responseData.success) {
          console.log('Post created successfully');
          navigation.goBack();
          console.log('New Post ID:', responseData.postId);
          // Navigate to the post page with the new post ID
          navigation.navigate('Feedscreen', { postId: responseData.postId });
        } else {
          console.error('Failed to create post:', responseData.error || text);
        }
      } catch (error) {
        console.error('Failed to parse response as JSON:', text);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.backButton}>{''}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Create a post</Text>

      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Schrijf iets van inhoud"
        value={postText}
        onChangeText={setPostText}
      />

      <TouchableOpacity style={styles.actionButton} onPress={handleNext}>
        <Text style={styles.actionText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton2} onPress={handleCancel}>
        <Text style={styles.actionText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Replace with your actual background color
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    // Add other styling for the back button
  },
  headerTitle: {
    fontSize: 22,
    top: -80,
    fontWeight: 'bold',
    // Add other styling for header title
  },
  optionButton: {
    width: '80%',
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0', // Replace with your actual button color
  },
  actionButton: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#186bc0', // Replace with your actual button color
  },
  actionButton2: {
    width: '80%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'black', // Replace with your actual button color
  },
  actionText: {
    fontSize: 16,
    color: 'white'
    // Add other styling for action button text
  },
  icon: {
    width: 50, // Adjust based on your icon size
    height: 50, // Adjust based on your icon size
    // Add other styling for icon
  },
  optionText: {
    fontSize: 18,
    marginTop: 8,
    // Add other styling for option text
  },
  textInput: {
    width: '80%',
    minHeight: 100, // Adjust the height as needed
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#FFF', // Adjust the background color as needed
    borderColor: '#E0E0E0', // Adjust border color as needed
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    // Add more styling as needed
  },
  // Add more styles as needed
});

export default CreatePostScreen;

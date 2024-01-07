import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesScreen = ({ route }) => {
  const navigation = useNavigation();
  const loggedInUserId = route.params?.userId; // Retrieve the logged-in user's ID from route params
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;
  
    const fetchMessages = () => {
      AsyncStorage.getItem('userId').then((userId) => {
        const apiUrl = `https://bilal.vaw.be/api.php?action=get_user_messages&user_id=${userId}`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.success && data.messages) {
              setMessages(data.messages);
            } else {
              throw new Error('Data from the API is not in the expected format');
            }
          })
          .catch((error) => {
            console.error('Error:', error.message);
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    };
  
    // Call fetchMessages immediately and set up the interval
    fetchMessages();
    intervalId = setInterval(fetchMessages, 3000);
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [loggedInUserId]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Feedscreen')}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          messages.map((message) => (
            <View key={message.Bericht_ID} style={styles.messageContainer}>
              <Image
                source={{ uri: message.SenderProfilePic }}
                style={styles.profileImage}
              />
              <View style={styles.messageContent}>
                <Text style={styles.messageSender}>{message.SenderName}</Text>
                <Text style={styles.messageText}>{message.Inhoud}</Text>
                <Text style={styles.timeAgo}>{message.Datum_en_tijd}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.navBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50, // Adjust the size as needed
    height: 50,
    borderRadius: 25, // For circular images
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  messagesContainer: {
    // Styles for the messages container
  },
  messageContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageSender: {
    fontWeight: 'bold',
    top:5,
  },
  messageText: {
    marginTop:10,
    marginBottom: 10,
  },
  timeAgo: {
    color: '#999',
    fontSize: 12,
  },
  navBar: {
    // Styles for navigation bar
  },
  // ... more styles
});

export default MessagesScreen;
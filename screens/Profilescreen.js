import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profilescreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params?.user;

  const [profileData, setProfileData] = useState({
    Gebruikersnaam: user?.Gebruikersnaam || 'Loading...',
    Bio: user?.Bio || 'Loading...',
    Profielfoto: user?.Profielfoto ? `https://bilal.vaw.be/${user.Profielfoto}` : null,
  });

  const [profileStats, setProfileStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    if (user?.Gebruikers_ID) {
      fetchFollowCounts(user.Gebruikers_ID);
      // Set up the interval for refreshing the data
      const interval = setInterval(() => {
        fetchFollowCounts(user.Gebruikers_ID);
      }, 5000); // Refresh every 30 seconds

      // Clear the interval when the component is unmounted
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchFollowCounts = (userId) => {
    // Corrected URL format
    fetch(`https://bilal.vaw.be/api.php?action=get_follow_counts&user_id=${userId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        if (data.success) {
          setProfileStats(prevStats => ({
            ...prevStats,
            followers: data.followers,
            following: data.following
          }));
        } else {
          throw new Error('Data fetch was unsuccessful.');
        }
      })
      .catch(error => {
        console.error('Error fetching or parsing data:', error);
      });
  };

  const handleBackPress = () => {
    navigation.navigate('Feedscreen');
  };

  const handleEditPress = () => {
    navigation.navigate('EditProfileScreen', { profileData: profileData });
  };

  const handleLogoutPress = () => {
    navigation.navigate('Login');
  };

  const images = [
    // Replace with your actual images
    require('../assets/img/Image1.png'),
    require('../assets/img/Image2.png'),
    require('../assets/img/Image3.png'),
    // ... more images
  ];

  const renderGalleryImages = () => {
    return images.map((imgSrc, index) => (
      <Image
        key={index}
        source={imgSrc}
        style={styles.galleryImage}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require('../assets/backicon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.name}>{profileData.Gebruikersnaam}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../assets/moreicon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileSection}>
        <Image 
          source={profileData.Profielfoto ? { uri: profileData.Profielfoto } : require('../assets/img/Luffy.png')} 
          style={styles.profilePic} 
        />
        <Text style={styles.bio}>{profileData.Bio}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileStats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileStats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profileStats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.galleryContainer}>
        {renderGalleryImages()}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  // Define your styles here
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes space evenly around the items
    width: '100%', // Takes full width of the container
  },
  editButton: {
    padding: 10,
    borderColor: "black", // Color of the border
    borderWidth: 1, // Width of the border
    borderRadius: 5,
    marginTop: 20,
    flex: 1, // Flex property to take up equal space
    marginRight: 5, // Add margin for spacing between buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "black", // Color of the border
    borderWidth: 1, // Width of the border
    marginTop: 20,
    flex: 1, // Flex property to take up equal space
    marginLeft: 5, // Add margin for spacing between buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    marginTop: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  bio: {
    textAlign: 'center',
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // This will distribute space evenly around the items
    marginTop: 30,
    marginBottom: -20, // Adds space below the container
    paddingHorizontal: 10, // Adds horizontal space inside the container
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center', // Centers the items vertically
    flex: 1, // Each item will take up equal space
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4, // Adds a little space between the number and the label
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  galleryImage: {
    width: '48%', // Two images per row with some space in between
    aspectRatio: 1, // Assuming square images for the gallery
    marginBottom: 8,
  },
  // ... Add any additional styles you need
});

export default Profilescreen;
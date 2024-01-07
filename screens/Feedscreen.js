import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Feedscreen = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    const apiUrl = 'https://bilal.vaw.be/api.php';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.hasOwnProperty('gdmapp_posts') && data.hasOwnProperty('gdmapp_gebruikers')) {
        const combinedData = data.gdmapp_posts.map(post => {
          // Find the user data for each post
          const userData = data.gdmapp_gebruikers.find(user => user.Gebruikers_ID === post.Gebruikers_ID);
  
          // Use userData to get the Profielfoto
          return {
            ...post,
            Profielfoto: userData && userData.Profielfoto ? `https://bilal.vaw.be/${userData.Profielfoto}` : null,
            likesCount: post.likesCount, // Use the likes count from the post data
          };
        });
        combinedData.sort((a, b) => new Date(b.Datum_en_tijd) - new Date(a.Datum_en_tijd));
        setFeedData(combinedData);
      } else {
        throw new Error('Data from the API is not in the expected format');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Function to fetch posts initially and set up the interval
    const initializeFeed = async () => {
      await fetchPosts();
      const interval = setInterval(fetchPosts, 20000); // Fetch posts every 20 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    };
  
    initializeFeed();
  
    // Cleanup function
    return () => {
      clearInterval(initializeFeed);
    };
  }, []);

  // Render Post Function
  const renderPost = (post, index) => {
    return (
      <View key={post.Post_ID || index.toString()} style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: post.Profielfoto }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{post.Gebruikersnaam}</Text>
        </View>
        <Text style={styles.timeAgo}>{post.Datum_en_tijd}</Text>
        <Text style={styles.postText}>{post.Inhoud}</Text>
        <View style={styles.postFooter}>
          <TouchableOpacity style={styles.likeButton}>
            <Icon name="heart-o" size={20} color="#000" />
            <Text style={styles.likeText}>{`${post.likesCount} Likes `}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentButton}>
            <Icon name="comment-o" size={20} color="#000" />
            <Text style={styles.commentText}>{` ${post.commentsCount} Comments `}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>49thebrand</Text>
      </View>
      <ScrollView style={styles.feedContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          feedData.map(renderPost)
        )}
      </ScrollView>
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
    marginTop:50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Adjust the color to fit your branding
  },
  addButton: {
    // Styles for add button
  },
  feedContainer: {
    // Styles for the feed container if necessary
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userName: {
    fontWeight: 'bold',
    top:10,
  },
  timeAgo: {
    color: '#999',
    top: -35,
    left: 260,
    fontSize: 12,
  },
  postText: {
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200, // Set a fixed height or make it responsive
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 8,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular image
    marginRight: 8,
  },
  navBar: {
    // Styles for navigation bar
  },
  // ... more styles
});

export default Feedscreen;

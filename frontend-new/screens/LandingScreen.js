import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, Share, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createClient } from 'pexels';

const LandingScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const apiKey = 'dyVmO8HG2yCWaM4CZ3nq6MMyJY4CGc49mv3r1iuAMHABlpD9eC8qno9l';
  const client = createClient(apiKey);

  useEffect(() => {
    client.photos.curated({ per_page: 30 })
      .then((photos) => {
        setImages(photos.photos);
      })
      .catch((error) => {
        console.error('Error fetching images:', error.message);
      });
  }, []);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Signup');
  };

  const handleLike = (photoId) => {
    // TODO: Implement your logic for liking a photo
    console.log(`Liked photo with ID: ${photoId}`);
  };

  const handleShare = async (photo) => {
    try {
      await Share.share({
        message: `Check out this photo on L'instant: ${photo.url}`,
      });
    } catch (error) {
      console.error('Error sharing photo:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {images.length ? (
          <View style={styles.imageRow}>
            {images.map((photo) => (
              <View key={photo.id} style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: photo.src.medium }} />
                <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => handleLike(photo.id)}>
                    <Text style={styles.icon}>❤️   </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleShare(photo)}>
                    <Text style={styles.icon}>   📤</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text>Chargement des images...</Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '45%',
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  icon: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  createAccountButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LandingScreen;

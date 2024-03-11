import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (!firstName || !lastName) {
        alert('Please enter your full name.');
        return;
      }
    } else if (step === 2) {
      if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
    } else if (step === 3) {
      if (!password || password.length < 6) {
        alert('Please enter a password with at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }
    }

    setStep(step + 1);
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignUp = async () => {
    if (step !== 3) return;

    try {
      const response = await fetch('https://your-backend-api.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        await AsyncStorage.setItem('userToken', token);

        navigation.navigate('Home');
        Alert.alert('Success', 'Your account has been created!');
      } else {
        Alert.alert('Error', data.message || 'Failed to create account.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleProtectedAction = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!userToken) {
        Alert.alert('Authentication Required', 'Please sign in to perform this action.');
        return;
      }

      const response = await fetch('https://your-backend-api.com/api/protected/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userToken,
        },
      });

      const protectedData = await response.json();

      Alert.alert('Protected Data', JSON.stringify(protectedData));
    } catch (error) {
      console.error('Error accessing protected data:', error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 2: Email Address</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 3: Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderStepContent()}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>{step === 3 ? 'Sign Up' : 'Next'}</Text>
      </TouchableOpacity>
      {step === 3 && (
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  signUpButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SignupScreen;

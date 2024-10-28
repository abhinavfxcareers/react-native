import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Idiyappam = ({navigation}) => {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [showImage, setShowImage] = useState(false);

  const handlePress = () => {
    setSubmittedText(inputText);
    setShowImage(true); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Idiyappam Form</Text>
      

      <TextInput
        style={styles.input}
        placeholder="Enter some text"
        value={inputText}
        onChangeText={setInputText}
      />
    
      <Button style={styles.submitBtn} title="Submit" onPress={handlePress} />
      

      {submittedText ? <Text style={styles.resultText}>You entered: {submittedText}</Text> : null}
      
      {showImage && (
        <Image
          style={styles.image}
          source={{ uri: 'https://www.balancenutrition.in/images/receipe-img/1536766681_large.jpg' }} 
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('dosa')}>
        <Text style={styles.buttonText}>Go to Dosa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search Stocks')}>
        <Text style={styles.buttonText}>Go to Search Stocks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Stock News')}>
        <Text style={styles.buttonText}>Stocks News</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    submitBtn: {
      marginVertical: 20,
      backgroundColor: '#ff7043',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
      color: '#fff',  
      fontWeight:"bold"
    }
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff', 
  },
  resultText: {
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText:{
    marginVertical: 20,
    backgroundColor: '#ff7043',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    color: '#fff',  
    fontWeight:"bold"
  },

  submitBtn:{
    marginVertical: 20,
    backgroundColor: '#ff7043',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    color: '#fff',  
    fontWeight:"bold"
    
  }

});

export default Idiyappam;

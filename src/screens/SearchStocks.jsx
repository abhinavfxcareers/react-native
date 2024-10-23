import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SearchStocks = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchStock = () => {
    if (stockSymbol === '') {
      setError('Please enter a stock symbol.');
      return;
    }

    setLoading(true);
    setError(null);

    axios({
      method: 'GET',
      url: `https://real-time-finance-data.p.rapidapi.com/search?query=${stockSymbol}&language=en`,
      headers: {
        'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
        'x-rapidapi-key': '9f62ed7842msh20390c64db2298dp1dbbf5jsn945b8e42b7ef',
      },
    })
      .then((response) => {
        setStockData(response.data.data.stock || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch stock data.');
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Stock Search</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={stockSymbol}
          onChangeText={(text) => setStockSymbol(text)}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchStock}>
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#3498db" style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView style={styles.results}>
        {stockData && stockData.length > 0 && stockData.map((stock, index) => (
          <View key={index} style={styles.stockCard}>
            <View style={styles.stockHeader}>
              <Text style={styles.stockName}>{stock.name}</Text>
              <Text style={styles.stockSymbol}>({stock.symbol})</Text>
            </View>
            <Text style={styles.stockPrice}>${stock.price}</Text>
            <Text style={[styles.stockChange, stock.change < 0 ? styles.negativeChange : styles.positiveChange]}>
              {stock.change} ({stock.change_percent}%)
            </Text>
            <View style={styles.divider}></View>
            <Text style={styles.stockDetails}>Prev Close: ${stock.previous_close}</Text>
            <Text style={styles.stockDetails}>Exchange: {stock.exchange}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme background
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f1f1f1', // Light font for dark theme
    textAlign: 'center',
    marginBottom: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1c1c1c', // Darker search bar background
    elevation: 4, // Subtle shadow for depth
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#f1f1f1', // Light text color
  },
  searchButton: {
    backgroundColor: '#3498db', // Vibrant blue for contrast
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
  },
  stockCard: {
    backgroundColor: '#1e1e1e', // Dark card background
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000', // Soft shadows for card depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: width * 0.9, // Responsive width to fit on various screen sizes
    alignSelf: 'center',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stockName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f1f1',
  },
  stockSymbol: {
    fontSize: 16,
    color: '#888',
  },
  stockPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2ecc71', // Green for price
    marginBottom: 8,
  },
  stockChange: {
    fontSize: 16,
    marginBottom: 10,
  },
  positiveChange: {
    color: '#2ecc71', // Green for positive change
  },
  negativeChange: {
    color: '#e74c3c', // Red for negative change
  },
  divider: {
    height: 1,
    backgroundColor: '#2c2c2c', // Subtle divider between sections
    marginVertical: 10,
  },
  stockDetails: {
    fontSize: 14,
    color: '#888',
  },
});

export default SearchStocks;

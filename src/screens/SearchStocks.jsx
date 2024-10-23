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

      <ScrollView 
  style={styles.results} 
  showsVerticalScrollIndicator={false} 
  showsHorizontalScrollIndicator={false}
>
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#ecf0f1',
    elevation: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#34495e',
  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  results: {
    marginTop: 20,
  },
  stockCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: width * 0.9,
    alignSelf: 'center',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stockName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  stockSymbol: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  stockPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 8,
  },
  stockChange: {
    fontSize: 16,
    marginBottom: 10,
  },
  positiveChange: {
    color: '#27ae60',
  },
  negativeChange: {
    color: '#e74c3c',
  },
  divider: {
    height: 1,
    backgroundColor: '#bdc3c7',
    marginVertical: 10,
  },
  stockDetails: {
    fontSize: 14,
    color: '#34495e',
  },
});

export default SearchStocks;

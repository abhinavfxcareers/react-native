import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Dosa = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      try {
        const response = await axios.get('https://real-time-finance-data.p.rapidapi.com/market-trends', {
          params: {
            trend_type: 'MARKET_INDEXES',
            country: 'us',
            language: 'en',
          },
          headers: {
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
            'x-rapidapi-key': '9f62ed7842msh20390c64db2298dp1dbbf5jsn945b8e42b7ef',
          },
        });

        console.log('this is my response:', response.data);
        setMarketData(response.data);
      } catch (error) {
        console.error('Error fetching market trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketTrends();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Market Trends</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : marketData && marketData.data ? (
        marketData.data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.indexName}>{item?.index_name || 'N/A'}</Text>
            <Text style={styles.indexValue}>Value: {item?.index_value || 'N/A'}</Text>
            <Text style={styles.indexChange}>Change: {item?.change || 'N/A'}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.errorText}>No data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  indexName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  indexValue: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  indexChange: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default Dosa;

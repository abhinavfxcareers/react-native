import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const Dosa = () => {
  const [dosaInfo, setDosaInfo] = useState(null);

  useEffect(() => {
    const fetchDosaInfo = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=dosa');
      const data = await response.json();
      setDosaInfo(data);
    };

    fetchDosaInfo();
  }, []); 

  return (
    <View>
      <Text>Dosa Information</Text>
      {dosaInfo ? (
        <Text>{dosaInfo.description}</Text>  
      ) : (
        <Text>Loading...</Text>  
      )}
    </View>
  );
};

export default Dosa;

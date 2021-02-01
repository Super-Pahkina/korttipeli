import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Buttoncoponent from './components/Buttoncoponent'

export default function App() {
  const [data, setData] = useState([])

  useEffect( ()=> fetchData())

  const fetchData =()=> {
    fetch('https://fineli.fi/fineli/api/v1/foods?q=33128')
    .then(response => response.json())
    .then(json => setData(JSON.stringify(json)))
    .catch((error) => console.error(error))
  }

  return (
    <View style={styles.container}>
      <Text style={{marginTop:100}}>HIENO ÄPPI</Text>
      <Text>{data}</Text>
      <Buttoncoponent></Buttoncoponent>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

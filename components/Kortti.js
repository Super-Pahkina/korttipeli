import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
/* 'https://fineli.fi/fineli/api/v1/foods?q=33128'*/
export default function Kortti() {
  const [data, setData] = useState([])
  const url = 'https://fineli.fi/fineli/api/v1/foods?q=33128'
  useEffect( ()=> {fetchData(url)})

  async function fetchData(url) {
  let response = await fetch(url); 

  const json = await response.json();
  console.log(json);
  setData( json );

  /*  .then(response => response.json())
    .then(data => {setData(data)})
    .catch((error) => console.error(error))
    
  )*/
  
  console.log(data[0].name.fi);
  }
  console.log(data);
  /*const elintarvike = 
    {
    name: data[0].name.fi,
    salt: 1,
    alcohol: 0,
    energyKcal: 485.3860626708132,
    fat: 29.6334998248294,
    protein: 14.7135001530461,
    carbohydrate: 38.1520001521353,
    organicAcids: 0,
    saturatedFat: 6.44468431470473,
    sugar: 3.42499991544522,
    sugarAlcohol: 0,
    fiber: 4.57200000035763,
    energy: 2031.72898112749
    }*/
    



  return (
  
    <View style={styles.container}>
      <Card>
      <Card.Title>{data[0].name.fi}</Card.Title>
      <Card.Divider/>
        <View >
         
          <Text style={styles.name}> suola: {Number(elintarvike.salt).toFixed(3)}</Text>
          <Text style={styles.name}> rasva: {Number(elintarvike.fat).toFixed(3)}</Text>
          <Text style={styles.name}> proteiini (g): {Number(elintarvike.protein).toFixed(3)}</Text>
          <Text style={styles.name}> sokeri: {Number(elintarvike.sugar).toFixed(3)}</Text>
          <Text style={styles.name}> energia: {Number(elintarvike.energyKcal).toFixed(3)}</Text>
          <Text style={styles.name}> hiilihydraatti: {Number(elintarvike.carbohydrate).toFixed(3)}</Text>
          <Text style={styles.name}> kuitu: {Number(elintarvike.fiber).toFixed(3)}</Text>
        </View>
      
</Card>
  {console.log(data)}
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

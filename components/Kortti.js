import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default function Kortti() {

  const elintarvike = [
    {
    name: 'chilipahkina',
    salt: 2772.82344498946,
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
    }
    ]



  return (
  
    <View style={styles.container}>
      <Card>
      <Card.Title>{elintarvike[0].name}</Card.Title>
      <Card.Divider/>
        <View >
         
          <Text style={styles.name}> suola: {Number(elintarvike[0].salt).toFixed(3)}</Text>
          <Text style={styles.name}> rasva: {Number(elintarvike[0].fat).toFixed(3)}</Text>
          <Text style={styles.name}> proteiini (g): {Number(elintarvike[0].protein).toFixed(3)}</Text>
          <Text style={styles.name}> sokeri: {Number(elintarvike[0].sugar).toFixed(3)}</Text>
          <Text style={styles.name}> energia: {Number(elintarvike[0].energyKcal).toFixed(3)}</Text>
          <Text style={styles.name}> hiilihydraatti: {Number(elintarvike[0].carbohydrate).toFixed(3)}</Text>
          <Text style={styles.name}> kuitu: {Number(elintarvike[0].fiber).toFixed(3)}</Text>
        </View>
      
</Card>
      
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

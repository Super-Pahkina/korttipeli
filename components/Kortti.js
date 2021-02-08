import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'

/* 'https://fineli.fi/fineli/api/v1/foods?q=33128'*/
export default function Kortti() {
  const [data, setData] = useState([])
  const [painettu, setPainettu] = useState(false);

  const url = 'https://fineli.fi/fineli/api/v1/foods/33128'
  useEffect( ()=> {fetchData(url), []})

  async function fetchData(url) {
  let response = await fetch(url); 

  const json = await response.json();
  console.log(JSON.stringify(json));
  setData( json );

  /*  .then(response => response.json())
    .then(data => {setData(data)})
    .catch((error) => console.error(error))
    
  )*/
  
  console.log(data[0]);
  }
  console.log(data);
  const elintarvike = 
    {
    name: 'Suolapähkinä',
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
    }
    
    const nappi =(i)=>{
      let a = 'Valitsit ' + i
      if(painettu === true){
        setPainettu(false);
      } else {
        setPainettu(true);
      }
      Alert.alert(a)
    }
    const kosketus = {
      activeOpacity: 1,
      underlayColor: 'blue',                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
      style: painettu ? styles.buttonPainettu : styles.rivi, // <-- but you can still apply other style changes
      onHideUnderlay: () => setPainettu(false),
      onShowUnderlay: () => setPainettu(true),
      onPress: () => console.log('HELLO'),                 // <-- "onPress" is apparently required
   };

  return (
  
    <View style={styles.container}>
      <Card containerStyle={styles.kortti}>
      <Card.Title>{elintarvike.name}</Card.Title>
      <Card.Divider/>
        <View >
         <View {...kosketus}>
          <Text style={styles.name}> suola: {Number(elintarvike.salt).toFixed(3)} </Text> 
          <TouchableHighlight style={styles.button} onPress={() => nappi('suola')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> rasva: {Number(elintarvike.fat).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('rasva')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> proteiini (g): {Number(elintarvike.protein).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('proteiini')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> sokeri: {Number(elintarvike.sugar).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('sokeri')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> energia: {Number(elintarvike.energyKcal).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('energia')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> hiilihydraatti: {Number(elintarvike.carbohydrate).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('hiilihydraatti')}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View style={styles.rivi}>
          <Text style={styles.name}> kuitu: {Number(elintarvike.fiber).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi('kuitu')}><Text >Valitse</Text></TouchableHighlight>
          </View>
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
    
    width:'100%'
    
  },
  name: {
    fontSize: 15,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft:15,
    paddingRight: 15,
  },
  button: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    borderStyle:'solid',
    borderColor:'black',
    borderWidth: 1,
  },
  rivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:8,
  },
  kortti: {
    marginLeft: 1,
    marginRight: 1,
    borderRadius:10,
    width:300
  },
  buttonPainettu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:8,
    backgroundColor: 'blue'
  }
});

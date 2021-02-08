import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'

/* 'https://fineli.fi/fineli/api/v1/foods?q=33128'*/
export default function Kortti() {
  const [data, setData] = useState([])
  const [painettu, setPainettu] = useState([false, false, false, false, false, false, false]);

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
      let list =  []
      let b = 0
      while (b < 7){
        if (b == i){
          list.push(true)
        } else{
          list.push(false)
        }
        b = b + 1;
      }
      console.log(list)
      setPainettu(list)
    }

    const kosketus = (i) => {
      const a = {
        activeOpacity: 1,
        underlayColor: 'blue',                           
        style: painettu[i] ? styles.buttonPainettu : styles.rivi, 
        onPress: () => console.log('HELLO'),                
      }
      return a
   };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.kortti}>
      <Card.Title>{elintarvike.name}</Card.Title>
      <Card.Divider/>
        <View >
         <View {...kosketus(0)}>
          <Text style={styles.name}> suola: {Number(elintarvike.salt).toFixed(3)} </Text> 
          <TouchableHighlight style={styles.button} onPress={() => nappi(0)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(1)}>
          <Text style={styles.name}> rasva: {Number(elintarvike.fat).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(1)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(2)}>
          <Text style={styles.name}> proteiini (g): {Number(elintarvike.protein).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(2)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(3)}>
          <Text style={styles.name}> sokeri: {Number(elintarvike.sugar).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(3)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(4)}>
          <Text style={styles.name}> energia: {Number(elintarvike.energyKcal).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(4)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(5)}>
          <Text style={styles.name}> hiilihydraatti: {Number(elintarvike.carbohydrate).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(5)}><Text >Valitse</Text></TouchableHighlight>
          </View>
          <View {...kosketus(6)}>
          <Text style={styles.name}> kuitu: {Number(elintarvike.fiber).toFixed(3)}</Text>
          <TouchableHighlight style={styles.button} onPress={() => nappi(6)}><Text >Valitse</Text></TouchableHighlight>
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
    paddingTop:4,
    paddingBottom:4,
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
    paddingTop:8,
    paddingBottom:8,
    backgroundColor: '#cdd0d4'
  }
});

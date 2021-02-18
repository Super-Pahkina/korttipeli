import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'

/* 'https://fineli.fi/fineli/api/v1/foods?q=33128'*/
export default function Kortti() {
  const [data, setData] = useState([])
  const [painettu, setPainettu] = useState();
  const [viesti, setViesti] = useState();
  const [pisteet, setPisteet] = useState(0);
  const [pisteet2, setPisteet2] = useState(0);
  const [maxPisteet, setMaxPisteet] = useState();
  
  const elintarvike = {
  name: 'Suolapähkinä',
  nutrition: {
    salt: 1,
    energyKcal: 485.3860626708132,
    fat: 29.6334998248294,
    protein: 14.7135001530461,
    carbohydrate: 38.1520001521353,
    sugar: 3.42499991544522,
    fiber: 4.57200000035763,
    }
  }

  const elintarvike2 = {
    name: 'Random',
    nutrition: {
      salt: Math.random() * 2,
      energyKcal:  Math.random() * 970,
      fat:  Math.random() * 60,
      protein:  Math.random() * 30,
      carbohydrate:  Math.random() * 80,
      sugar:  Math.random() * 7,
      fiber: Math.random() * 9,
      }
    }

  const labels = {
    salt: "Suola",
    energyKcal: "Energia (Kcal)",
    fat: "Rasva",
    protein: "Proteiini",
    carbohydrate: "Hiilihydraatit",
    sugar: "Sokeri",
    fiber: "Kuitu"
  }

  let ravintoarvot = Object.keys(elintarvike.nutrition);
['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate',  'sugar',  'fiber']

    const nappi =(i)=>{
      setPainettu(i)
    }

    const kosketus = (i) => {
      const a = {
        activeOpacity: 1,
        underlayColor: 'blue',                           
        style: painettu == i ? styles.buttonPainettu : styles.rivi, 
        onPress: () => console.log('HELLO'),                
      }
      return a
  };
    const lukitse =() => {
      let a = elintarvike.nutrition[painettu].toFixed(3)
      let b = elintarvike2.nutrition[painettu].toFixed(3)
      let c = Number(a)
      let d = Number(b)
      
      if(c > d){
      setViesti('Valitsit ' + labels[painettu].toLowerCase() + '\n' + "Voitit arvolla: " + a + '\n' + "Vastustajan arvo: " + b)
        setPisteet(pisteet + 1)
      } else if(c < d) {
        setViesti('Valitsit ' + labels[painettu].toLowerCase() + '\n' + "Hävisit arvolla: " + a + '\n' + "Vastustajan arvo: " + b)
        setPisteet2(pisteet2 + 1)
      } else{
        Alert.alert('Tasapeli')
      }
    }

  return (
    <View style={styles.container}>
      <View style = {{flexDirection: 'row'}}>
        <Text>Pisteesi: {pisteet} </Text>
        <Text>Vastustajan pisteet: {pisteet2} </Text>
      </View> 
      <Card containerStyle={styles.kortti}>
        <Card.Title>{elintarvike.name}</Card.Title>
        <Card.Divider/>
        { ravintoarvot.map((ravintoarvo, index) => (
        <View {...kosketus(ravintoarvo)}>
          <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)} </Text> 
          <TouchableHighlight style={styles.button} onPress={() => nappi(ravintoarvo)}><Text >Valitse</Text></TouchableHighlight>
        </View>
        ))}
      
      </Card>
      {console.log(data)}
      {painettu == null ?
      <></> : 
      <View style={styles.nappi}>
        <Button title="Lukitse valinta" onPress={() => lukitse()}></Button>
      </View>
      }
      {viesti == null ?
      <></> : 
      <View style={styles.nappi}>
        <Text>{viesti}</Text>
      </View>
      }
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
  },
  nappi: {
    paddingTop: 20
  }
});

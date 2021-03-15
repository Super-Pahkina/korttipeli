import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef, forceUpdate } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert, Animated} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

/* 'https://fineli.fi/fineli/api/v1/foods?q=33128'*/
export default function Vastus(props) {
    const [key, setKey] = useState(0);
    const [data, setData] = useState([])
    const [viesti, setViesti] = useState();
    let painettu = ''
    let { route } = props
    let { Propsit } = route.params
    let propsit = Propsit
    const navigation = useNavigation();
    const [pelatutKortit, setPelatutKortit] = useState(propsit.pelatutKortit);
    const isFocused = useIsFocused();
    const [cards, setCards] = useState(propsit.pakka);


  const [elintarvike, setElintarvike] = useState({
    name: '',
    nutrition: {
      salt: '',
      energyKcal: '',
      fat: '',
      protein: '',
      carbohydrate: '',
      sugar: '',
      fiber: ''
    }
  })

  const [elintarvike2, setElintarvike2] = useState({
    name: '',
    nutrition: {
      salt: '',
      energyKcal: '',
      fat: '',
      protein: '',
      carbohydrate: '',
      sugar: '',
      fiber: ''
    }
  })

  // otaa korttilistalta yhden kortin
  const selectCard = () => {
    /*let randomIndex = Math.floor(Math.random() * cards.length)
    
    while (listOfUsedCardIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * cards.length)
    }
    listOfUsedCardIndexes.push(randomIndex)*/

    return randomIndex
  }

  const setGameCards = () => {
    let chosenCard = cards[Number(propsit.pelatutKortit)]
    let chosenCard2 = cards[Number(propsit.pelatutKortit + 1)]
    setPelatutKortit(propsit.pelatutKortit + 2)

    setElintarvike({
      name: `${chosenCard.name_fi}`,
      nutrition: {
        salt: `${chosenCard.salt}`,
        energyKcal: `${chosenCard.energyKcal}`,
        fat: `${chosenCard.fat}`,
        protein: `${chosenCard.protein}`,
        carbohydrate: `${chosenCard.carbohydrate}`,
        sugar: `${chosenCard.sugar}`,
        fiber: `${chosenCard.fiber}`,
      }
    })

    setElintarvike2({
      name: `${chosenCard2.name_fi}`,
      nutrition: {
        salt: `${chosenCard2.salt}`,
        energyKcal: `${chosenCard2.energyKcal}`,
        fat: `${chosenCard2.fat}`,
        protein: `${chosenCard2.protein}`,
        carbohydrate: `${chosenCard2.carbohydrate}`,
        sugar: `${chosenCard2.sugar}`,
        fiber: `${chosenCard2.fiber}`
      }
    })
  }

  /*const elintarvike = {
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
      fiber: Math.random() * 9.144,
    }
  }*/

  const labels = {
    salt: "Suola (mg)",
    energyKcal: "Energia (Kcal)",
    fat: "Rasva (g)",
    protein: "Proteiini (g)",
    carbohydrate: "Hiilihydraatit (g)",
    sugar: "Sokeri (g)",
    fiber: "Kuitu (g)"
  }

  useEffect(() => { if (isFocused) {setGameCards(); } }, [isFocused]);

  let ravintoarvot = Object.keys(elintarvike.nutrition);
['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate',  'sugar',  'fiber']

    const nappi =(i)=>{
      setPainettu(i)
    }

    const annaPisteet = ()=>{
      setPisteet(pisteet + 1)
    }
    const annaPisteet2 = ()=>{
      setPisteet2(pisteet2 + 1)
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

  /*  useEffect(() => {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      //  setTimeout(function(){tekoalyVuoro(), 50000})
     //   setTimeout(function(){tekoalyVuoro(({timePassed: true})), 5000})
        tekoalyVuoro()
        //  onScreenLoad();
    }, []) */


    const lukitse =() => {     
        let Propsit = { 
            ValittuArvo: painettu,
            peliAika: propsit.peliAika,
            Pisteesi: propsit.Pisteesi,
            VastustajanPisteet: propsit.VastustajanPisteet,
            VoittoPisteet: propsit.VoittoPisteet,
            pelatutKortit: pelatutKortit,
            elintarvike: elintarvike,
            elintarvike2: elintarvike2,
            pakka: propsit.pakka
          }
        navigation.navigate('KierroksenTulos', {Propsit: Propsit})
    }

    const tekoalyVuoro = () => {
        let Valinta = (Math.random() * 6).toFixed(0)
        console.log(Valinta)
        painettu = ravintoarvot[Valinta]
        lukitse()
    }

    /*
    Vastustajan vuorolle joku häviö systeemi jos aika loppuu. Tekoälyltä ei voi loppua aika, joten kommentoitu for now. Tarvitaan vasta pelaaja vs pelaaja tilanteessa.
    const havio = () => {
      setPisteet2(pisteet2 + 1);
      if (pisteet2 + 1 >= voittoPisteet){
        let Tulos = { 
          tulos: 'Hävisit pelin', 
          Pisteesi: pisteet,
          VastustajanPisteet: pisteet2 + 1,
          VoittoPisteet: voittoPisteet
        }
      navigation.navigate('Tulossivu', {Tulokset: Tulos})
      }
    }
    */

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <CountdownCircleTimer
        onComplete={() => {
            tekoalyVuoro()
            return [true, 1000]
        }}
        key = {key}
        isPlaying
        duration={5}
        size = {100}
        colors={[
          ['#13ad0e', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor }}>
            {remainingTime}
          </Animated.Text>
        )}
        </CountdownCircleTimer>
      </View>
      <Text>Voittoon tarvittavat pisteet: {propsit.VoittoPisteet} </Text>
      <View style = {{flexDirection: 'row'}}>
      <Text>Pisteesi: {propsit.Pisteesi} </Text>
        <Text>Vastustajan pisteet: {propsit.VastustajanPisteet} </Text>
      </View> 
      <Card containerStyle={styles.kortti}>
        <Card.Title>{elintarvike.name}</Card.Title>
        { ravintoarvot.map((ravintoarvo, index) => (
        <View {...kosketus(ravintoarvo)}>
          <Text style={styles.name}>{labels[ravintoarvo]}:  </Text>
          <Text style={styles.nutrition}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
        </View>
        ))}
      
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%',
    backgroundColor: "#c2efff"
  },
  divider: {
    backgroundColor: '#808791',
    height: 1.5,
  },
  nutrition: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'brown',
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
    borderColor:'#808791',
    borderWidth: 1,
  },
  timer: {
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderColor:'#c2efff',
    borderWidth: 1,
    paddingTop: 2
    
  },
  rivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:3.5,
    paddingBottom:3.5,
  },
  kortti: {
    flex: 0.5,
    marginLeft: 1,
    marginRight: 1,
    borderRadius:10,
    borderStyle:'solid',
    borderColor:'#808791',
    backgroundColor: '#e0f7ff',
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
    flex: 0.1,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});

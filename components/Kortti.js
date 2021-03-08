import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert, Animated} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

/* 'https://fineli.fi/fineli/api/v1/foods?q=id'*/
export default function Kortti(props) {
  //console.log('tulostus ' + JSON.stringify(props))
  const [key, setKey] = useState(0);
  const [data, setData] = useState([])
  const [painettu, setPainettu] = useState();
  const [viesti, setViesti] = useState();
  const [pisteet, setPisteet] = useState(0);
  const [pisteet2, setPisteet2] = useState(0);
  const { route } = props
  const { nro } = route.params
  const { aika } = route.params
  const { pakka } = route.params
  console.log("PAKKA" + pakka.length)
  const [voittoPisteet, setVoittoPisteet] = useState(nro);
  const [peliAika, setPeliAika] = useState(aika);
  const navigation = useNavigation();
  const [cards, setCards] = useState(pakka);
  const listOfUsedCardIndexes=[];

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
    let randomIndex = Math.floor(Math.random() * cards.length)
    
    while (listOfUsedCardIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * cards.length)
    }
    listOfUsedCardIndexes.push(randomIndex)

    return randomIndex
  }

  useEffect(() => {
    setGameCards()
  }, [])

  const setGameCards = () => {
    let chosenCard = cards[selectCard()]
    let chosenCard2 = cards[selectCard()]

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
    const lukitse =(vuoro) => {
    
      setKey(prevKey => prevKey + 1)
      let a = parseFloat(elintarvike.nutrition[painettu]).toFixed(3)
      let b = parseFloat(elintarvike2.nutrition[painettu]).toFixed(3)
      let c = Number(a)
      let d = Number(b)

      setGameCards()
      
      if(c > d){
      setViesti('Valitsit ' + labels[painettu].toLowerCase() + '\n' + "Voitit arvolla: " + a + '\n' + "Vastustajan arvo: " + b)
        annaPisteet()
        if (pisteet + 1 >= voittoPisteet){
          let Tulos = { 
              tulos: 'Voitit pelin', 
              Pisteesi: pisteet + 1,
              VastustajanPisteet: pisteet2,
              VoittoPisteet: voittoPisteet
            }
          navigation.navigate('Tulossivu', {Tulokset: Tulos})
        }
      } else if(c < d) {
        setViesti('Valitsit ' + labels[painettu].toLowerCase() + '\n' + "Hävisit arvolla: " + a + '\n' + "Vastustajan arvo: " + b)
        annaPisteet2()
        if (pisteet2 + 1 >= voittoPisteet){
          let Tulos = { 
            tulos: 'Hävisit pelin', 
            Pisteesi: pisteet,
            VastustajanPisteet: pisteet2 + 1,
            VoittoPisteet: voittoPisteet
          }
        navigation.navigate('Tulossivu', {Tulokset: Tulos})
        }
      } else{
        Alert.alert('Tasapeli')
      }
      console.log(pisteet)
      console.log(pisteet2)
    if ((pisteet + pisteet2) % 2 == 0 ||(pisteet + pisteet2) == 0){
      console.log(123)
     // setTimeout(tekoalyVuoro(), 5000)
     tekoalyVuoro()
    }
     }

    const tekoalyVuoro = () => {
      let Valinta = (Math.random() * 6).toFixed(0)
      console.log(Valinta)
        setPainettu(ravintoarvot[Valinta])
        this.button.props.onPress();
    }

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

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <CountdownCircleTimer
        onComplete={() => {
          havio()
          return [true, 1000]
        }}
        key = {key}
        isPlaying
        duration={peliAika}
        size = {100}
        colors={[
          ['#004777', 0.4],
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
      <Text>Voittoon tarvittavat pisteet: {voittoPisteet} </Text>
      <View style = {{flexDirection: 'row'}}>
        <Text>Pisteesi: {pisteet} </Text>
        <Text>Vastustajan pisteet: {pisteet2} </Text>
      </View> 
      <Card containerStyle={styles.kortti}>
        <Card.Title>{elintarvike.name}</Card.Title>
        <Card.Divider style={styles.divider}/>
        { ravintoarvot.map((ravintoarvo, index) => (
        <View {...kosketus(ravintoarvo)}>
          <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)} </Text> 
          <TouchableHighlight style={styles.button} underlayColor='#808791' onPress={() => nappi(ravintoarvo)}><Text >Valitse</Text></TouchableHighlight>
        </View>
        ))}
      
      </Card>
      {console.log(data)}
      {painettu == null ?
      <></> : 
      <View style={styles.nappi}>
        <Button title="Lukitse valinta" onPress={() => lukitse(1)}
                    //ref={(button) => {this.button = button; }}
        />
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
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'100%'
  },
  divider: {
    backgroundColor: '#808791',
    height: 1.5,
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
    borderColor:'#fff',
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
    backgroundColor: '#e6eaf0',
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

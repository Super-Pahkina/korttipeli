import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Animated} from 'react-native';
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Vastus(props) {
    const [key, setKey] = useState(0);
    let painettu = ''
    let { route } = props
    let { Propsit } = route.params
    let propsit = Propsit
    const navigation = useNavigation();
    const [pelatutKortit, setPelatutKortit] = useState(propsit.pelatutKortit);
    const isFocused = useIsFocused();
    const [cards, setCards] = useState(propsit.pakka);

  //Annetaan uudet kortit vuoron alussa.
  useEffect(() => { if (isFocused) {setGameCards(); } }, [isFocused]);

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

  //Otetaan valmiiksi randomoidusta pakasta 2 korttia ja laitetaan niiden arvot elintarvike-muuttujiin.
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

  const labels = {
    salt: "Suola (mg)",
    energyKcal: "Energia (Kcal)",
    fat: "Rasva (g)",
    protein: "Proteiini (g)",
    carbohydrate: "Hiilihydraatit (g)",
    sugar: "Sokeri (g)",
    fiber: "Kuitu (g)"
  }

  let ravintoarvot = Object.keys(elintarvike.nutrition);
['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate',  'sugar',  'fiber']

  //Lähetetään tarvittavat tiedot KierroksenTulokset -sivulle
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

  //Tekoälynä toimiva Math.random() funktio tekee tekoälyn
  const tekoalyVuoro = () => {
      let Valinta = (Math.random() * 6).toFixed(0)
      console.log(Valinta)
      painettu = ravintoarvot[Valinta]
      lukitse()
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Animated } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useIsFocused } from "@react-navigation/native";
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

export default function Kortti(props) {

  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);
  const [painettu, setPainettu] = useState();
  const [viesti, setViesti] = useState();
  let { route } = props
  let { Propsit } = route.params
  let propsit = Propsit
  let indeksi = propsit.omaPakka.length - 1;
  const [pelattavanKortinValinta, setPelattavanKortinValinta] = useState(0);
  const navigation = useNavigation();
  const isCarousel = React.useRef((c) => { this._carousel = c; })
  const [kaynnissa, setKaynnissa] = useState(true);
  const [pelatutKortit, setPelatutKortit] = useState(propsit.pelatutKortit);
  const [omaPakka, setOmaPakka] = useState(propsit.omaPakka)
  const [vastustajanPakka, setVastustajanPakka] = useState(propsit.vastustajanPakka);

  const valitseIkoni = () => {
    if (elintarvike.jokeri === 'true') {
      return <Icon
        name='diamond'
        type='font-awesome'
      />
    }
    else if (elintarvike.pommi === 'true') {
      return <Icon
        name='snowflake-o'
        type='font-awesome'
      />
    } else {
      return null;
    }
  }

  const vaihdaIndeksia = (currentIndex) => {
    indeksi = currentIndex;
    console.log(indeksi, "ny");
    console.log(currentIndex, "Indeksi");
  }

  const [elintarvike, setElintarvike] = useState({
    name: '',
    jokeri: '',
    pommi: '',
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
    jokeri: '',
    pommi: '',
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

  const setGameCards = (indeksi) => {
    let chosenCard = omaPakka[indeksi]
    omaPakka.splice(indeksi, 1);
    let chosenCard2 = vastustajanPakka[Number(propsit.pelatutKortit)]
    setPelatutKortit(propsit.pelatutKortit + 1)

    setElintarvike({
      name: `${chosenCard.name_fi}`,
      jokeri: `${chosenCard.jokeri}`,
      pommi: `${chosenCard.pommi}`,
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
      jokeri: `${chosenCard2.jokeri}`,
      pommi: `${chosenCard2.pommi}`,
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
    setPelattavanKortinValinta(1);
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

  //Annetaan uudet kortit vuoron alussa, resetoidaan valinta viimevuorolta ja käynnistetään vuoroaika
  useEffect(() => { if (isFocused) { setKaynnissa(true); setPainettu(); } }, [isFocused]);

  let ravintoarvot = Object.keys(elintarvike.nutrition);
  ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate', 'sugar', 'fiber']

  const nappi = (i) => {
    setPainettu(i)
  }

  //Valitun arvon korostaminen
  const kosketus = (i) => {
    const a = {
      activeOpacity: 1,
      underlayColor: 'blue',
      style: painettu == i ? styles.buttonPainettu : styles.rivi,
      onPress: () => console.log('HELLO'),
    }
    return a
  };

  //Lähetetään tarvittavat tiedot KierroksenTulos-sivulle
  const lukitse = () => {
    setPelattavanKortinValinta(0);
    let Propsit = {
      ValittuArvo: painettu,
      peliAika: propsit.peliAika,
      Pisteesi: propsit.Pisteesi,
      VastustajanPisteet: propsit.VastustajanPisteet,
      VoittoPisteet: propsit.VoittoPisteet,
      pelatutKortit: pelatutKortit,
      elintarvike: elintarvike,
      elintarvike2: elintarvike2,
      omaPakka: propsit.omaPakka,
      vastustajanPakka: propsit.vastustajanPakka,
    }
    setKey(prevKey => prevKey + 1)
    setKaynnissa(false)
    navigation.navigate('KierroksenTulos', { Propsit: Propsit })
  }

  //Funktio, jota kutsutaan vuoroajan loppuessa. Vastustajalle annetaan piste ja lähetetään tarvittavat tiedot KierroksenTulos-sivulle
  const havio = () => {
    setPelattavanKortinValinta(0);
    let Propsit = {
      ValittuArvo: '',
      peliAika: propsit.peliAika,
      Pisteesi: propsit.Pisteesi,
      VastustajanPisteet: propsit.VastustajanPisteet + 1,
      VoittoPisteet: propsit.VoittoPisteet,
      pelatutKortit: pelatutKortit,
      elintarvike: elintarvike,
      elintarvike2: elintarvike2,
      omaPakka: propsit.omaPakka,
      vastustajanPakka: propsit.vastustajanPakka,
    }
    setKey(prevKey => prevKey + 1)
    setKaynnissa(false)
    navigation.navigate('KierroksenTulos', { Propsit: Propsit })
  }

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <CountdownCircleTimer
          onComplete={() => {
            havio()
            return [true, 1000]
          }}
          key={key}
          isPlaying={kaynnissa}
          duration={propsit.peliAika}
          size={100}
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
      <View style={{ flexDirection: 'row' }}>
        <Text>Pisteesi: {propsit.Pisteesi} </Text>
        <Text>Vastustajan pisteet: {propsit.VastustajanPisteet} </Text>
      </View>
      { pelattavanKortinValinta == 0 ?
        <View style={styles.carousel} >
          <Carousel
            layout="stack"
            layoutCardOffset={9}
            ref={isCarousel}
            data={propsit.omaPakka}
            firstItem={propsit.omaPakka.length - 1}
            renderItem={CarouselCardItem}
            sliderWidth={350}
            itemWidth={310}
            sliderHeight={2000}
            itemHeight={2000}
            inactiveSlideShift={0}
            useScrollView={true}
            onSnapToItem={vaihdaIndeksia}
          />
        </View>
        :
        <Card containerStyle={styles.kortti}>
          <Card.Title>{valitseIkoni()}{elintarvike.name}</Card.Title>
          {ravintoarvot.map((ravintoarvo, index) => (
            <View {...kosketus(ravintoarvo)}>
              <Text style={styles.name}>{labels[ravintoarvo]}:  </Text>
              <Text style={styles.nutrition}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
              <TouchableHighlight style={styles.button} underlayColor='#808791' onPress={() => nappi(ravintoarvo)}><Text >Valitse</Text></TouchableHighlight>
            </View>
          ))}
        </Card>
      }
      { pelattavanKortinValinta == 0 ?
        <View style={styles.napit}>
          <TouchableHighlight style={styles.button} underlayColor='#c5eba4' onPress={() => { setGameCards(indeksi) }}><Text style={styles.teksti}>Valitse kortti</Text></TouchableHighlight>
        </View>
        :
        <></>
      }
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
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: "#c2efff"
  },
  arvot: {
    flexDirection: 'row'
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
  carousel: {
    flex: 0.55,
  },
  name: {
    fontSize: 15,
    width: 160,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderColor: '#808791',
    borderWidth: 1,
  },
  timer: {
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderColor: '#c2efff',
    borderWidth: 1,
    paddingTop: 2

  },
  rivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3.5,
    paddingBottom: 3.5,
  },
  kortti: {
    flex: 0.5,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#808791',
    backgroundColor: '#e0f7ff',
    width: 300
  },
  buttonPainettu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#cdd0d4'
  },
  nappi: {
    flex: 0.1,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});

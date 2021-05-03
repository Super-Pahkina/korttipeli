import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Animated, TouchableHighlight, Button } from 'react-native';
import { Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

export default function Vastus(props) {
  const [key, setKey] = useState(0);
  const [painettu, setPainettu] = useState('');
  let { route } = props
  let { Propsit } = route.params
  let propsit = Propsit
  let indeksi = propsit.omaPakka.length - 1;
  const navigation = useNavigation();
  let kaynnissa = true;
  const isCarousel = React.useRef((c) => { this._carousel = c; })
  const [pelatutKortit, setPelatutKortit] = useState(propsit.pelatutKortit);
  const isFocused = useIsFocused();
  const [omaPakka, setOmaPakka] = useState(propsit.omaPakka)
  const [pelattavanKortinValinta, setPelattavanKortinValinta] = useState(0);
  const [vastustajanPakka, setVastustajanPakka] = useState(propsit.vastustajanPakka);
  const [vastustajanValinta, setVastustajanValinta] = useState(true);
  const taustakuva = propsit.kuvaUrl
  const [aika, setAika] = useState(3);

  //Annetaan uudet kortit vuoron alussa.
  //useEffect(() => { if (isFocused) {setGameCards(); } }, [isFocused]);

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

  const vaihdaIndeksia = (currentIndex) => {
    indeksi = currentIndex;
    console.log(indeksi, "ny");
    console.log(currentIndex, "Indeksi");
  }

  //Otetaan valmiiksi randomoidusta pakasta 2 korttia ja laitetaan niiden arvot elintarvike-muuttujiin.
  const setGameCards = (indeksi) => {
    let chosenCard = omaPakka[indeksi]
    omaPakka.splice(indeksi, 1);
    let chosenCard2 = vastustajanPakka[Number(propsit.pelatutKortit)]
    setPelatutKortit(propsit.pelatutKortit + 1)
    setPelattavanKortinValinta(1)

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
      jokeri: `${chosenCard.jokeri}`,
      pommi: `${chosenCard.pommi}`,
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
  ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate', 'sugar', 'fiber']

  //Lähetetään tarvittavat tiedot KierroksenTulokset -sivulle
  const lukitse = () => {
    console.log(elintarvike)
    console.log(painettu)
    let Propsit = {
      valittuArvo: painettu,
      peliAika: propsit.peliAika,
      Pisteesi: propsit.Pisteesi,
      VastustajanPisteet: propsit.VastustajanPisteet,
      VoittoPisteet: propsit.VoittoPisteet,
      pelatutKortit: pelatutKortit,
      elintarvike: elintarvike,
      elintarvike2: elintarvike2,
      omaPakka: omaPakka,
      vastustajanPakka: propsit.vastustajanPakka,
      kuvaUrl: propsit.kuvaUrl,
    }
    setKey(prevKey => prevKey + 1)
    kaynnissa = false
    navigation.navigate('KierroksenTulos', { Propsit: Propsit })
  }

  const palautaPelaajalleKortti = () => {
    let pelaajanKortti = {
      name: `${omaPakka[indeksi].name_fi}`,
      jokeri: `${omaPakka[indeksi].jokeri}`,
      pommi: `${omaPakka[indeksi].pommi}`,
      nutrition: {
        salt: `${omaPakka[indeksi].salt}`,
        energyKcal: `${omaPakka[indeksi].energyKcal}`,
        fat: `${omaPakka[indeksi].fat}`,
        protein: `${omaPakka[indeksi].protein}`,
        carbohydrate: `${omaPakka[indeksi].carbohydrate}`,
        sugar: `${omaPakka[indeksi].sugar}`,
        fiber: `${omaPakka[indeksi].fiber}`,
      }
    }
    omaPakka.splice(indeksi, 1);
    return pelaajanKortti
  }

  const palautaVastustajalleKortti = () => {
    let vastustajanKortti = {
      name: `${vastustajanPakka[Number(propsit.pelatutKortit)].name_fi}`,
      jokeri: `${vastustajanPakka[Number(propsit.pelatutKortit)].jokeri}`,
      pommi: `${vastustajanPakka[Number(propsit.pelatutKortit)].pommi}`,
      nutrition: {
        salt: `${vastustajanPakka[Number(propsit.pelatutKortit)].salt}`,
        energyKcal: `${vastustajanPakka[Number(propsit.pelatutKortit)].energyKcal}`,
        fat: `${vastustajanPakka[Number(propsit.pelatutKortit)].fat}`,
        protein: `${vastustajanPakka[Number(propsit.pelatutKortit)].protein}`,
        carbohydrate: `${vastustajanPakka[Number(propsit.pelatutKortit)].carbohydrate}`,
        sugar: `${vastustajanPakka[Number(propsit.pelatutKortit)].sugar}`,
        fiber: `${vastustajanPakka[Number(propsit.pelatutKortit)].fiber}`,
      }
    }
    return vastustajanKortti
  }

  //Tekoälynä toimiva Math.random() funktio tekee tekoälyn
  const tekoalyVuoro = () => {
    if (vastustajanValinta) {
      let valinta = (Math.random() * 6).toFixed(0)
      console.log(valinta)
      setAika(propsit.peliAika)
      setVastustajanValinta(false);
      setPainettu(ravintoarvot[valinta])
      setKey(prevKey => prevKey + 1)
    } else {
      let pelattujenKorttienMaara = pelatutKortit
      let pelaajanKortti = ""
      let vastustajanKortti = ""
      if (elintarvike.name === "") {
        pelaajanKortti = palautaPelaajalleKortti()
        vastustajanKortti = palautaVastustajalleKortti()
        pelattujenKorttienMaara = pelattujenKorttienMaara + 1
      } else {
        pelaajanKortti = elintarvike
        vastustajanKortti = elintarvike2
      }
      setPelattavanKortinValinta(0);
      let Propsit = {
        valittuArvo: painettu,
        peliAika: propsit.peliAika,
        Pisteesi: propsit.Pisteesi,
        VastustajanPisteet: propsit.VastustajanPisteet + 1,
        VoittoPisteet: propsit.VoittoPisteet,
        pelatutKortit: pelattujenKorttienMaara,
        elintarvike: pelaajanKortti,
        elintarvike2: vastustajanKortti,
        omaPakka: propsit.omaPakka,
        vastustajanPakka: propsit.vastustajanPakka,
      }
      setKey(prevKey => prevKey + 1)
      kaynnissa = false
      navigation.navigate('KierroksenTulos', { Propsit: Propsit })
    }
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
    <ImageBackground
      source={{ uri: taustakuva }}
      style={{ width: '100%', height: '100%' }}
    >

      <View style={styles.container}>
        <View style={styles.timer}>
          <CountdownCircleTimer
            onComplete={() => {
              tekoalyVuoro()
              return [true, 1000]
            }}
            key={key}
            isPlaying={kaynnissa}
            duration={aika}
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
        <Text style={styles.ylarivinTeksti}>Voittoon tarvittavat pisteet: {propsit.VoittoPisteet} </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.ylarivinTeksti}>Pisteesi: {propsit.Pisteesi} </Text>
          <Text style={styles.ylarivinTeksti}>Vastustajan pisteet: {propsit.VastustajanPisteet} </Text>
        </View>
        {painettu.length > 1 ? <Text style={styles.ylarivinTeksti}>Vastustaja valitsi arvon: {labels[painettu]} </Text> : <></>}
        {pelattavanKortinValinta == 0 ?
          <View style={styles.carousel} >
            <Carousel
              layout="stack"
              layoutCardOffset={9}
              ref={isCarousel}
              data={propsit.omaPakka.map((kortti, index) => ({ kortti, valittu: [] }))}
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
            <Card.Title>{elintarvike.name}</Card.Title>
            {ravintoarvot.map((ravintoarvo, index) => (
              <View {...kosketus(ravintoarvo)}>
                <Text style={styles.name}>{labels[ravintoarvo]}:  </Text>
                <Text style={styles.nutrition}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
              </View>
            ))}
          </Card>
        }
        {vastustajanValinta ? <></> : pelattavanKortinValinta == 0 ?
          <View style={styles.napit}>
            <TouchableHighlight
              style={styles.valitseKortti}
              underlayColor='#c5eba4'
              onPress={() => { setGameCards(indeksi) }}>
              <Text style={styles.teksti}>Valitse kortti</Text>
            </TouchableHighlight>
          </View>
          :
          <></>
        }
        {vastustajanValinta ? <></> : pelattavanKortinValinta == 1 ?
          <View style={styles.nappi}>
            <TouchableHighlight
              style={styles.valitseKortti}
              underlayColor='#c5eba4'
              onPress={() => lukitse()}>
              <Text style={styles.teksti}>Lukitse valinta</Text>
            </TouchableHighlight>
          </View>
          :
          <></>
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    //  backgroundColor: "#c2efff"
  },
  text: {
    fontWeight: "bold",
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  carousel: {
    flex: 0.6,
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
  },
  ylarivinTeksti: {
    marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  valitseKortti: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: "center",
    letterSpacing: 1.1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#c2efff',
    width: 200,
    borderColor: 'black',
    borderWidth: 3
  },
  teksti: {
    marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  }
});

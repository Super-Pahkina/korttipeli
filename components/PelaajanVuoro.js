import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useIsFocused } from "@react-navigation/native";
import Carousel from 'react-native-snap-carousel';
import KarusellinKortti from './KarusellinKortti';

export default function PelaajanVuoro(props) {
  const isFocused = useIsFocused();
  const [avain, setAvain] = useState(0);
  const [painettu, setPainettu] = useState();
  let { route } = props
  let { Propsit } = route.params
  let propsit = Propsit
  let indeksi = propsit.omaPakka.length - 1;
  const [pelattavanKortinValinta, setPelattavanKortinValinta] = useState(0);
  const navigaatio = useNavigation();
  const onKaruselli = React.useRef((c) => { this._carousel = c; })
  const [kaynnissa, setKaynnissa] = useState(true);
  const [pelatutKortit, setPelatutKortit] = useState(propsit.pelatutKortit);
  const [omaPakka, setOmaPakka] = useState(propsit.omaPakka)
  const [vastustajanPakka, setVastustajanPakka] = useState(propsit.vastustajanPakka);
  const taustakuva = { uri: propsit.kuvaUrl }

  const ValitseIkoni = () => {
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

  const VaihdaIndeksia = (currentIndex) => {
    indeksi = currentIndex;
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

  const leimat = {
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

  const AsetaPelikortit = (indeksi) => {
    let valittuKortti = omaPakka[indeksi]
    omaPakka.splice(indeksi, 1);
    let valittuKortti2 = vastustajanPakka[Number(propsit.pelatutKortit)]
    setPelatutKortit(propsit.pelatutKortit + 1)

    setElintarvike({
      name: `${valittuKortti.name_fi}`,
      jokeri: `${valittuKortti.jokeri}`,
      pommi: `${valittuKortti.pommi}`,
      nutrition: {
        salt: `${valittuKortti.salt}`,
        energyKcal: `${valittuKortti.energyKcal}`,
        fat: `${valittuKortti.fat}`,
        protein: `${valittuKortti.protein}`,
        carbohydrate: `${valittuKortti.carbohydrate}`,
        sugar: `${valittuKortti.sugar}`,
        fiber: `${valittuKortti.fiber}`,
      }
    })

    setElintarvike2({
      name: `${valittuKortti2.name_fi}`,
      jokeri: `${valittuKortti2.jokeri}`,
      pommi: `${valittuKortti2.pommi}`,
      nutrition: {
        salt: `${valittuKortti2.salt}`,
        energyKcal: `${valittuKortti2.energyKcal}`,
        fat: `${valittuKortti2.fat}`,
        protein: `${valittuKortti2.protein}`,
        carbohydrate: `${valittuKortti2.carbohydrate}`,
        sugar: `${valittuKortti2.sugar}`,
        fiber: `${valittuKortti2.fiber}`
      }
    })
    setPelattavanKortinValinta(1);
  }

  //Annetaan uudet kortit vuoron alussa, resetoidaan valinta viimevuorolta ja käynnistetään vuoroaika
  useEffect(() => {
    if (isFocused) {
      setKaynnissa(true)
      setPainettu()
    }
  }, [isFocused])

  const ValitseRavintoarvo = (i) => {
    setPainettu(i)
  }

  //Valitun arvon korostaminen
  const Korostus = (i) => {
    const a = {
      activeOpacity: 1,
      underlayColor: 'blue',
      style: painettu == i ? styles.painikePainettu : styles.rivi,
      onPress: () => console.log('HELLO'),
    }
    return a
  };

  //Lähetetään tarvittavat tiedot KierroksenTulos-sivulle
  const Lukitse = () => {
    setPelattavanKortinValinta(0);
    let Propsit = {
      valittuArvo: painettu,
      peliAika: propsit.peliAika,
      pisteesi: propsit.pisteesi,
      vastustajanPisteet: propsit.vastustajanPisteet,
      voittoPisteet: propsit.voittoPisteet,
      pelatutKortit: pelatutKortit,
      elintarvike: elintarvike,
      elintarvike2: elintarvike2,
      omaPakka: propsit.omaPakka,
      vastustajanPakka: propsit.vastustajanPakka,
      kuvaUrl: propsit.kuvaUrl,
    }
    setAvain(prevKey => prevKey + 1)
    setKaynnissa(false)
    navigaatio.navigate('KierroksenTulos', { Propsit: Propsit })
  }

  const PalautaPelaajalleKortti = () => {
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

  const PalautaVastustajalleKortti = () => {
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

  //Funktio, jota kutsutaan vuoroajan loppuessa. Pelaajalle annetaan kortti, jonka päällä pelaaja oli ajan loppuessa ja satunnainen ravintoarvo
  const AikaLoppui = () => {
    let valinta = (Math.random() * 6).toFixed(0)
    let pelaajanKortti = ""
    let vastustajanKortti = ""
    let valittuArvo = ravintoarvot[valinta]
    let pelattujenKorttienMaara = pelatutKortit
    if (elintarvike.name === "") {
      pelaajanKortti = PalautaPelaajalleKortti()
      vastustajanKortti = PalautaVastustajalleKortti()
      pelattujenKorttienMaara = pelattujenKorttienMaara + 1
    } else {
      pelaajanKortti = elintarvike
      vastustajanKortti = elintarvike2
    }
    setPelattavanKortinValinta(0);
    let Propsit = {
      valittuArvo: valittuArvo,
      peliAika: propsit.peliAika,
      pisteesi: propsit.pisteesi,
      vastustajanPisteet: propsit.vastustajanPisteet,
      voittoPisteet: propsit.voittoPisteet,
      pelatutKortit: pelattujenKorttienMaara,
      elintarvike: pelaajanKortti,
      elintarvike2: vastustajanKortti,
      omaPakka: propsit.omaPakka,
      vastustajanPakka: propsit.vastustajanPakka,
      kuvaUrl: propsit.kuvaUrl,
    }
    setAvain(prevKey => prevKey + 1)
    setKaynnissa(false)
    navigaatio.navigate('KierroksenTulos', { Propsit: Propsit })
  }

  return (
    <ImageBackground
      source={taustakuva}
      style={styles.taustakuva}
    >
      <View style={styles.container}>
        <View style={styles.ajastin}>
          <CountdownCircleTimer
            onComplete={() => {
              AikaLoppui()
              return [true, 1000]
            }}
            key={avain}
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
        <Text style={styles.ylarivinTeksti}>Voittoon tarvittavat pisteet: {propsit.voittoPisteet} </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.ylarivinTeksti}>Pisteesi: {propsit.pisteesi} </Text>
          <Text style={styles.ylarivinTeksti}>Vastustajan pisteet: {propsit.vastustajanPisteet} </Text>
        </View>
        {pelattavanKortinValinta == 0 ?
          <View style={styles.carousel} >
            <Carousel
              layout="stack"
              layoutCardOffset={9}
              ref={onKaruselli}
              data={propsit.omaPakka.map((kortti, index) => ({ kortti, valittu: [] }))}
              firstItem={propsit.omaPakka.length - 1}
              renderItem={KarusellinKortti}
              sliderWidth={350}
              itemWidth={310}
              sliderHeight={2000}
              itemHeight={2000}
              inactiveSlideShift={0}
              useScrollView={true}
              onSnapToItem={VaihdaIndeksia}
            />
          </View>
          :
          <Card containerStyle={styles.kortti}>
            <Card.Title>{ValitseIkoni()}{elintarvike.name}</Card.Title>
            {ravintoarvot.map((ravintoarvo, index) => (
              <View {...Korostus(ravintoarvo)}>
                <Text style={styles.ravintoarvonNimi}>{leimat[ravintoarvo]}:  </Text>
                <Text style={styles.ravintoarvolukema}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
                <TouchableHighlight
                  style={styles.valintapainike}
                  underlayColor='#808791'
                  onPress={() => ValitseRavintoarvo(ravintoarvo)}>
                  <Text >Valitse</Text>
                </TouchableHighlight>
              </View>
            ))}
          </Card>
        }
        {pelattavanKortinValinta == 0 ?
          <View style={styles.napit}>
            <TouchableHighlight
              style={styles.valitseKorttiPainike}
              underlayColor='#c5eba4'
              onPress={() => { AsetaPelikortit(indeksi) }}>
              <Text style={styles.teksti}>Valitse kortti</Text>
            </TouchableHighlight>
          </View>
          :
          <></>
        }
        {painettu == null ?
          <></> :
          <View style={styles.napit}>
            <TouchableHighlight
              style={styles.valitseKorttiPainike}
              underlayColor='#c5eba4'
              onPress={() => Lukitse()}>
              <Text style={styles.teksti}>Lukitse valinta</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 20
  },
  ravintoarvolukema: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'brown',
  },
  carousel: {
    flex: 0.55,
  },
  ravintoarvonNimi: {
    fontSize: 15,
    width: 160,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  valintapainike: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderColor: '#808791',
    backgroundColor: '#c2efff',
    borderRadius: 6,
    borderWidth: 1,
  },
  ajastin: {
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderColor: '#c2efff',
    borderWidth: 0,
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
  painikePainettu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#cdd0d4'
  },
  teksti: {
    //marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  ylarivinTeksti: {
    marginBottom: 10,
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    color: '#c2efff'
  },
  valitseKorttiPainike: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: "center",
    letterSpacing: 1.1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#c2efff',
    width: 200,
    borderColor: 'black',
    borderWidth: 3
  },
  taustakuva: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%',
  },
});

import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function Tulokset(props) {

  const [vuoro, setVuoro] = useState("Vastus")
  const navigaatio = useNavigation();
  let { route } = props
  let { Propsit } = route.params
  let propsit = Propsit
  let pisteesi = propsit.pisteesi
  let vastustajanPisteet = propsit.vastustajanPisteet
  let elintarvike = propsit.elintarvike
  let elintarvike2 = propsit.elintarvike2
  const taustakuva = { uri: propsit.kuvaUrl }

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

  let ravintoarvot2 = Object.keys(elintarvike2.nutrition);
  ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate', 'sugar', 'fiber']

  const ValitseIkoni = (elintarvike) => {
    if (elintarvike.jokeri === 'true') {
      return <Icon
        name='diamond'
        type='font-awesome'
        size={15}
      />
    }
    else if (elintarvike.pommi === 'true') {
      return <Icon
        name='snowflake-o'
        type='font-awesome'
        size={15}
      />
    } else {
      return "";
    }
  }

  //Funktio, joka määrittää mihin sivuun siirrytään ja annetaan tarvittavat propsit. Jos pisteet ovat sama kuin voittoon tarvittavat pisteet, 
  //siirrytään voittoruutuun. Muussa tapauksessa annetaan vuoro edellisen vuoron perusteella.
  const Siirry = () => {
    if (pisteesi >= propsit.voittoPisteet) {
      let tulos = {
        tulos: 'Voitit pelin',
        pisteesi: pisteesi,
        vastustajanPisteet: vastustajanPisteet,
        voittoPisteet: propsit.voittoPisteet
      }
      navigaatio.navigate('Tulossivu', { tulokset: tulos })
    } else if (vastustajanPisteet >= propsit.voittoPisteet) {
      let tulos = {
        tulos: 'Hävisit pelin',
        pisteesi: pisteesi,
        vastustajanPisteet: vastustajanPisteet,
        voittoPisteet: propsit.voittoPisteet
      }
      navigaatio.navigate('Tulossivu', { tulokset: tulos })
    } else {
      console.log("Kierros", propsit.pelatutKortit)
      let Propsit = {
        kaynnissa: true,
        valittuArvo: propsit.valittuArvo,
        peliAika: propsit.peliAika,
        pisteesi: pisteesi,
        vastustajanPisteet: vastustajanPisteet,
        voittoPisteet: propsit.voittoPisteet,
        pelatutKortit: propsit.pelatutKortit,
        omaPakka: propsit.omaPakka,
        vastustajanPakka: propsit.vastustajanPakka,
        kuvaUrl: propsit.kuvaUrl,
      }
      if (vuoro == "Pelaaja") {
        setVuoro("Vastus")
        navigaatio.navigate('PelaajanVuoro', { Propsit: Propsit })
      } else if (vuoro == "Vastus") {
        setVuoro("Pelaaja")
        navigaatio.navigate('VastustajanVuoro', { Propsit: Propsit })
      }
    }
  }

  //Elintarvikkeiden ravintoarvon vertailu -funktio
  const Vertaa = (ravintoarvo) => {
    if (Number(elintarvike.nutrition[ravintoarvo]) > Number(elintarvike2.nutrition[ravintoarvo])) {
      return 1;
    } else if (Number(elintarvike.nutrition[ravintoarvo]) < Number(elintarvike2.nutrition[ravintoarvo])) {
      return 2;
    } else {
      return 3;
    }
  }

  //Pistetilanteen päivitys -funktio
  const PelaajanPisteidenPaivitys = () => {
    if (Number(elintarvike.nutrition[propsit.valittuArvo]) >= Number(elintarvike2.nutrition[propsit.valittuArvo])) {
      if (elintarvike.pommi === 'true') {
        pisteesi = pisteesi + 1
      }
      if (elintarvike2.jokeri === 'true') {
        pisteesi = pisteesi + 1
      }
      pisteesi = pisteesi + 1
    }
    return pisteesi
  }

  //Pistetilanteen päivitys -funktio
  const VastustajanPisteidenPaivitys = () => {
    if (Number(elintarvike.nutrition[propsit.valittuArvo]) <= Number(elintarvike2.nutrition[propsit.valittuArvo])) {
      if (elintarvike2.pommi === 'true') {
        vastustajanPisteet = vastustajanPisteet + 1
      }
      if (elintarvike.jokeri === 'true') {
        vastustajanPisteet = vastustajanPisteet + 1
      }
      vastustajanPisteet = vastustajanPisteet + 1
    }
    return vastustajanPisteet
  }

  //Valitun arvon korostaminen
  const Korostus = (i) => {
    const a = {
      activeOpacity: 1,
      underlayColor: 'blue',
      style: propsit.valittuArvo == i ? styles.korostus : styles.rivi,
      onPress: () => console.log(''),
    }
    return a
  };

  //Tekstin värin muokkaaminen vertailun perusteella
  const TekstinVari = (ravintoarvo) => {
    const a = {
      style: Vertaa(ravintoarvo) == 2 ? styles.nimiPunainen : Vertaa(ravintoarvo) == 1 ? styles.nimiVihrea : styles.nimiSininen,
      onPress: () => console.log(''),
    }
    return a
  };

  const vahvistaSiirtyminenKoti = () => {
    Alert.alert(
      "Vahvista",
      "Oletko varma, että haluat keskeyttää pelin ja siirtyä etusivulle?",
      [
        {
          text: "Peruuta",
          style: "cancel"
        },
        { text: "Siirry", onPress: () => navigaatio.navigate('Koti') }
      ]
    );
  }

  return (
    <ImageBackground
      source={taustakuva}
      style={styles.taustakuva}
    >
      <View style={styles.kontti}>
        <Text></Text>
        <View style={styles.ylarivinTyyli}>
          <Icon
            name='home'
            type='font-awesome'
            size={22}
            reverse
            raised
            onPress={vahvistaSiirtyminenKoti}
          />
          <View style={styles.pelitilanne}>
            <Text style={styles.ylarivinTeksti}>Pisteesi: {PelaajanPisteidenPaivitys()} / {propsit.voittoPisteet} </Text>
            <Text style={styles.ylarivinTeksti}>Vastustajan pisteet: {VastustajanPisteidenPaivitys()} / {propsit.voittoPisteet} </Text>
          </View>
        </View>
        <Card containerStyle={styles.kortti}>
          <Card.Title style={styles.otsikko}>{ValitseIkoni(elintarvike2)}{elintarvike2.name}</Card.Title>
          {ravintoarvot2.map((ravintoarvo, index) => (
            <View {...Korostus(ravintoarvo)}>
              <Text style={styles.nimi}>{leimat[ravintoarvo]}:  </Text>
              <Text style={styles.ravinto}>{Number(elintarvike2.nutrition[ravintoarvo]).toFixed(3)}</Text>
              {Vertaa(ravintoarvo) == 2 ?
                <AntDesign name="caretup" size={24} color="green" />
                : Vertaa(ravintoarvo) == 1 ?
                  <AntDesign name="caretdown" size={24} color="red" />
                  :
                  <FontAwesome5 name="equals" size={24} color="blue" />}
            </View>
          ))}
        </Card>
        <Card containerStyle={styles.kortti}>
          <Card.Title style={styles.otsikko}>{ValitseIkoni(elintarvike)}{elintarvike.name}</Card.Title>
          {ravintoarvot.map((ravintoarvo, index) => (
            <View key={index} {...Korostus(ravintoarvo)}>
              <Text {...TekstinVari(ravintoarvo)}>{leimat[ravintoarvo]}: </Text>
              <Text style={styles.ravinto}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
              {Vertaa(ravintoarvo) == 1 ?
                <AntDesign name="caretup" size={24} color="green" />
                : Vertaa(ravintoarvo) == 2 ?
                  <AntDesign name="caretdown" size={24} color="red" />
                  :
                  <FontAwesome5 name="equals" size={24} color="blue" />}
            </View>
          ))}
        </Card>
        <View style={styles.painike}>
          <TouchableHighlight
            style={styles.siirryPainike}
            underlayColor='#c5eba4'
            onPress={() => Siirry()}>
            <Text style={styles.teksti}>Jatka</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  kontti: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  kuvake: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
  },
  otsikko: {
    height: "10%",
    alignContent: "center",
    justifyContent: 'space-around',
    color: "black"
  },
  ravinto: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'black',
    fontWeight: "bold",
    textAlign: "right",
  },
  nimi: {
    fontSize: 15,
    width: 160,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nimiPunainen: {
    fontSize: 15,
    width: 160,
    color: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nimiVihrea: {
    fontSize: 15,
    width: 160,
    color: 'darkgreen',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nimiSininen: {
    fontSize: 15,
    width: 160,
    color: 'blue',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  rivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kortti: {
    flex: 1.5,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#808791',
    backgroundColor: '#e0f7ff',
    width: 300
  },
  korostus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#cdd0d4'
  },
  painike: {
    flex: 0.5,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ylarivinTeksti: {
    marginBottom: 5,
    letterSpacing: 1.1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    color: '#c2efff'
  },

  ylarivinTyyli: {
    flexDirection: 'row',
  },
  siirryPainike: {
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
  },
  taustakuva: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
  pelitilanne: {
    marginLeft: 20,
    alignItems: 'flex-start',
    marginTop: 4,
    justifyContent: 'center'
  }
});

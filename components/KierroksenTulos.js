import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function Tulokset(props) {

  const [vuoro, setVuoro] = useState("Vastus")
  const navigation = useNavigation();
  let { route } = props
  let { Propsit } = route.params
  let propsit = Propsit
  let pisteesi = propsit.Pisteesi
  let vastustajanPisteet = propsit.VastustajanPisteet
  let elintarvike = propsit.elintarvike
  let elintarvike2 = propsit.elintarvike2

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

  let ravintoarvot2 = Object.keys(elintarvike2.nutrition);
  ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate', 'sugar', 'fiber']

  const valitseIkoni = (elintarvike) => {
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
  const siirry = () => {
    if (pisteesi >= propsit.VoittoPisteet) {
      let Tulos = {
        tulos: 'Voitit pelin',
        Pisteesi: pisteesi,
        VastustajanPisteet: vastustajanPisteet,
        VoittoPisteet: propsit.VoittoPisteet
      }
      navigation.navigate('Tulossivu', { Tulokset: Tulos })
    } else if (vastustajanPisteet >= propsit.VoittoPisteet) {
      let Tulos = {
        tulos: 'Hävisit pelin',
        Pisteesi: pisteesi,
        VastustajanPisteet: vastustajanPisteet,
        VoittoPisteet: propsit.VoittoPisteet
      }
      navigation.navigate('Tulossivu', { Tulokset: Tulos })
    } else {
      console.log("Kierros", propsit.pelatutKortit)
      let Propsit = {
        kaynnissa: true,
        ValittuArvo: propsit.ValittuArvo,
        peliAika: propsit.peliAika,
        Pisteesi: pisteesi,
        VastustajanPisteet: vastustajanPisteet,
        VoittoPisteet: propsit.VoittoPisteet,
        pelatutKortit: propsit.pelatutKortit,
        omaPakka: propsit.omaPakka,
        vastustajanPakka: propsit.vastustajanPakka,
      }
      console.log(Propsit.ValittuArvo)
      if (vuoro == "Pelaaja") {
        setVuoro("Vastus")
        navigation.navigate('Kortti', { Propsit: Propsit })
      } else if (vuoro == "Vastus") {
        setVuoro("Pelaaja")
        navigation.navigate('VastustajanVuoro', { Propsit: Propsit })
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
  const Pisteesi = () => {
    if (Number(elintarvike.nutrition[propsit.ValittuArvo]) >= Number(elintarvike2.nutrition[propsit.ValittuArvo])) {
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
  const VastustajanPisteet = () => {
    if (Number(elintarvike.nutrition[propsit.ValittuArvo]) <= Number(elintarvike2.nutrition[propsit.ValittuArvo])) {
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
  const kosketus = (i) => {
    const a = {
      activeOpacity: 1,
      underlayColor: 'blue',
      style: propsit.ValittuArvo == i ? styles.buttonPainettu : styles.rivi,
      onPress: () => console.log('HELLO'),
    }
    return a
  };

  //Tekstin värin muokkaaminen vertailun perusteella
  const tekstinVari = (ravintoarvo) => {
    const a = {
      style: Vertaa(ravintoarvo) == 2 ? styles.nameRed : Vertaa(ravintoarvo) == 1 ? styles.nameGreen : styles.nameBlue,
      onPress: () => console.log('HELLO'),
    }
    return a
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <View>
        <Text>Pisteesi: {Pisteesi()} / {propsit.VoittoPisteet} </Text>
        <Text>Vastustajan pisteet: {VastustajanPisteet()} / {propsit.VoittoPisteet} </Text>
      </View>
      <Card containerStyle={styles.kortti}>
        <Card.Title style={styles.otsikko}>{valitseIkoni(elintarvike2)}{elintarvike2.name}</Card.Title>
        {ravintoarvot2.map((ravintoarvo, index) => (
          <View {...kosketus(ravintoarvo)}>
            <Text style={styles.name}>{labels[ravintoarvo]}:  </Text>
            <Text style={styles.nutrition2}>{Number(elintarvike2.nutrition[ravintoarvo]).toFixed(3)}</Text>
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
        <Card.Title style={styles.otsikko}>{valitseIkoni(elintarvike)}{elintarvike.name}</Card.Title>
        {ravintoarvot.map((ravintoarvo, index) => (
          <View {...kosketus(ravintoarvo)}>
            <Text {...tekstinVari(ravintoarvo)}>{labels[ravintoarvo]}: </Text>
            <Text style={styles.nutrition2}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
            {Vertaa(ravintoarvo) == 1 ?
              <AntDesign name="caretup" size={24} color="green" />
              : Vertaa(ravintoarvo) == 2 ?
                <AntDesign name="caretdown" size={24} color="red" />
                :
                <FontAwesome5 name="equals" size={24} color="blue" />}
          </View>
        ))}
      </Card>
      <View style={styles.nappi}>
        <Button title="Siirry" onPress={() => siirry()}></Button>
      </View>
    </View>
  )
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
  kuvake: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
  },
  divider: {
    backgroundColor: '#808791',
    height: 1.5,
  },
  otsikko: {
    height: "10%",
    alignContent: "center",
    justifyContent: 'space-around',
    color: "black"
  },
  nutrition: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'brown',
    textAlign: "right",

  },
  nutrition2: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'black',
    fontWeight: "bold",
    textAlign: "right",
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
  nameRed: {
    fontSize: 15,
    width: 160,
    color: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameGreen: {
    fontSize: 15,
    width: 160,
    color: 'darkgreen',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameBlue: {
    fontSize: 15,
    width: 160,
    color: 'blue',
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
    borderColor: '#fff',
    borderWidth: 1,
    paddingTop: 2

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
  buttonPainettu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#cdd0d4'
  },
  nappi: {
    flex: 0.5,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});

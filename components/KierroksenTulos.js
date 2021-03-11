import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef, forceUpdate } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert, Animated} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


export default function Tulokset (props){

    const [vuoro, setVuoro] = useState("Vastus")
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    let { route } = props
    let { Propsit } = route.params
    let propsit = Propsit
    let pisteesi = propsit.Pisteesi
    let vastustajanPisteet = propsit.VastustajanPisteet
    let elintarvike = propsit.elintarvike
    let elintarvike2 = propsit.elintarvike2

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

    let ravintoarvot2 = Object.keys(elintarvike2.nutrition);
    ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate',  'sugar',  'fiber']


    const siirry = () => {
      if (pisteesi == propsit.VoittoPisteet){
        let Tulos = { 
          tulos: 'Voitit pelin', 
          Pisteesi: pisteesi,
          VastustajanPisteet: vastustajanPisteet,
          VoittoPisteet: propsit.VoittoPisteet
        }
        navigation.navigate('Tulossivu', {Tulokset: Tulos})
      }else if (vastustajanPisteet == propsit.VoittoPisteet){
        let Tulos = { 
          tulos: 'Hävisit pelin', 
          Pisteesi: pisteesi,
          VastustajanPisteet: vastustajanPisteet,
          VoittoPisteet: propsit.VoittoPisteet
        }
        navigation.navigate('Tulossivu', {Tulokset: Tulos})
      } else{
      console.log("Kierros", propsit.pelatutKortit)
      let Propsit = { 
        kaynnissa: true,
        ValittuArvo: propsit.ValittuArvo,
        peliAika: propsit.peliAika,
        Pisteesi: pisteesi,
        VastustajanPisteet: vastustajanPisteet,
        VoittoPisteet: propsit.VoittoPisteet,
        pelatutKortit: propsit.pelatutKortit,
        pakka: propsit.pakka
      }
      console.log(Propsit.ValittuArvo)
      if (vuoro == "Pelaaja"){
        setVuoro("Vastus")
        navigation.navigate('Kortti', {Propsit: Propsit})
      }else if (vuoro == "Vastus"){
        setVuoro("Pelaaja")
        navigation.navigate('VastustajanVuoro', {Propsit: Propsit})
      }
    }
    }

    const Vertaa = (ravintoarvo) => {
      if (Number(elintarvike.nutrition[ravintoarvo]) > Number(elintarvike2.nutrition[ravintoarvo])){
        return 1;
      } else if (Number(elintarvike.nutrition[ravintoarvo]) < Number(elintarvike2.nutrition[ravintoarvo])){
        return 2;
      } else {
        return 3;
      }
    }

    const Pisteesi = () => {
      if (Number(elintarvike.nutrition[propsit.ValittuArvo]) > Number(elintarvike2.nutrition[propsit.ValittuArvo])){
        pisteesi = pisteesi + 1
      }
      return pisteesi
    }

    const VastustajanPisteet = () => {
      if (Number(elintarvike.nutrition[propsit.ValittuArvo]) < Number(elintarvike2.nutrition[propsit.ValittuArvo])){
        vastustajanPisteet = vastustajanPisteet + 1;
      }
      return vastustajanPisteet
    }

    const kosketus = (i) => {
      const a = {
        activeOpacity: 1,
        underlayColor: 'blue',                           
        style: propsit.ValittuArvo == i ? styles.buttonPainettu : styles.rivi, 
        onPress: () => console.log('HELLO'),                
      }
      return a
    };

    return (
        <View style={styles.container}>
          <Text>Voittoon tarvittavat pisteet: {propsit.VoittoPisteet} </Text>
          <View style = {{flexDirection: 'row'}}>
            <Text>Pisteesi: {Pisteesi()} </Text>
            <Text>Vastustajan pisteet: {VastustajanPisteet()} </Text>
          </View> 
          <Card containerStyle={styles.kortti}>
            <Card.Title style={styles.otsikko}>{elintarvike2.name}</Card.Title>
              { ravintoarvot2.map((ravintoarvo, index) => (
                <View {...kosketus(ravintoarvo)}>
                    <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike2.nutrition[ravintoarvo]).toFixed(3)}</Text> 
                    {Vertaa(ravintoarvo) == 1 ? 
                      <AntDesign style={styles.kuvake} name="caretdown" size={24} color="red" /> 
                      : Vertaa(ravintoarvo) == 2 ? 
                      <AntDesign name="caretup" size={24} color="green" /> 
                      : 
                      <FontAwesome5 name="equals" size={24} color="blue" />}
                </View>
            ))}
            </Card>
            <Card containerStyle={styles.kortti}>
             <Card.Title style={styles.otsikko}>{elintarvike.name}</Card.Title> 
                { ravintoarvot.map((ravintoarvo, index) => (
                <View {...kosketus(ravintoarvo)}>
                    <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)} </Text> 
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
      width:'100%'
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
      height: "9%",
      alignContent: "center",
      justifyContent: 'space-around',
      color: "black"
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
 
    },
    kortti: {
      flex: 1.5,
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
      backgroundColor: '#cdd0d4'
    },
    nappi: {
      flex: 0.5,
      paddingTop: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }
  });
  
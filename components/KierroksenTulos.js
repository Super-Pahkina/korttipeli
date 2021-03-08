import * as Expo from 'expo';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef, forceUpdate } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight, Alert, Animated} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Card, ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useIsFocused } from "@react-navigation/native";


export default function Tulokset (props){

    const [vuoro, setVuoro] = useState("Vastus")
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { route } = props
    const { Propsit } = route.params
    const [propsit, setPropsit] = useState(Propsit);

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

    const siirry = () => {
        let Propsit = { 
            kaynnissa: true,
            ValittuArvo: propsit.ValittuArvo,
            peliAika: propsit.peliAika,
            Pisteesi: propsit.Pisteesi,
            VastustajanPisteet: propsit.VastustajanPisteet,
            VoittoPisteet: propsit.VoittoPisteet
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

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.kortti}>
            <Card.Title>{elintarvike.name}</Card.Title>
            <Card.Divider style={styles.divider}/>
            { ravintoarvot.map((ravintoarvo, index) => (
                <View >
                    <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)} </Text> 
                </View>
            ))}
            </Card>
            <Card containerStyle={styles.kortti}>
            <Card.Title>{elintarvike.name}</Card.Title>
            <Card.Divider style={styles.divider}/>
            { ravintoarvot.map((ravintoarvo, index) => (
                <View>
                    <Text style={styles.name}>{labels[ravintoarvo]}: {Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)} </Text> 
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
      flex: 0.75,
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
      flex: 0.5,
      paddingTop: 10,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }
  });
  
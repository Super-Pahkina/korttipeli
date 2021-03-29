import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function PakanValinta(props) {
    const [pakka, setPakka] = useState([]);
    const navigation = useNavigation();
    let { route } = props
    let { Propsit } = route.params
    let propsit = Propsit
    let url = propsit.url

    // TODO:
    // cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
    useEffect(() => {
        fetchCards()
        console.log("URRLI", url)
        console.log("PAKKA", pakka.length)
    }, [])

    // hakee tarvittavan määrän kortteja
    const fetchCards = async () => {
        try {
            let response = await fetch(url)
            setPakka(await response.json())
        } catch (error) {
            console.log("ERROR FETCHISSÄ", error)
        }
    }

    //Ohjataan käyttäjän vuorolle ja annetaan tarvittavat tiedot
    const aloitaPeli = () => {
        Propsit = {
            VoittoPisteet: propsit.VoittoPisteet,
            peliAika: propsit.peliAika,
            kaynnissa: true,
            Pisteesi: 0,
            VastustajanPisteet: 0,
            pakka: pakka,
            pelatutKortit: 0
        }
        navigation.navigate('Kortti', { Propsit: Propsit })
    }

    return (
        <View>
            <Button
                title="Aloita peli"
                onPress={() => aloitaPeli()}
            />
        </View>
    )
}
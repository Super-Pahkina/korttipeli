import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Button } from 'react-native';

export default function Gamerules({ navigation }) {
    const [voittopisteet, setVoittopisteet] = useState(5)
    const [aika, setAika] = useState(30)
    const [pakka, setPakka] = useState([]);

    useEffect(() => {
        fetchCards()
    }, [voittopisteet])

    // hakee tarvittavan määrän kortteja
    const fetchCards = async () => {
        try {
            let response = await fetch(`http://192.168.56.1:3001/howmany/${voittopisteet * 2}`) // oman koneen IP
            setPakka(await response.json())
        } catch (error) {
            console.log("ERROR", error)
        }
    }


    const PlusVoittopisteet = () => {
        setVoittopisteet(voittopisteet + 1)
    }

    const MinusVoittopisteet = () => {
        setVoittopisteet(voittopisteet - 1)
    }

    const PlusAika = () => {
        setAika(aika + 5)
    }

    const MinusAika = () => {
        setAika(aika - 5)
    }

    const lukitse = () => {

    }

    const aloitaPeli = () => {
        console.log("PAKKA F", pakka[0])
        Propsit = {
            VoittoPisteet: voittopisteet,
            peliAika: aika,
            kaynnissa: true,
            Pisteesi: 0,
            VastustajanPisteet: 0,
            pakka: pakka,
            pelatutKortit: 0
        }
        navigation.navigate('Kortti', { Propsit: Propsit })
    }

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text>Vuoroaika (5-60)</Text>
            </View>
            <View style={styles.valinta}>
                {aika < 6 ?
                    <TouchableOpacity style={styles.buttonFade}><Text style={styles.nappiTeksti}>-</Text></TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => MinusAika()}><Text style={styles.nappiTeksti}>-</Text></TouchableOpacity>
                }
                <Text style={styles.nappiTeksti}>{aika}</Text>
                {aika > 59 ?
                    <TouchableOpacity style={styles.buttonFade}><Text style={styles.nappiTeksti}>+</Text></TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => PlusAika()}><Text style={styles.nappiTeksti}>+</Text></TouchableOpacity>
                }
            </View>

            <View style={styles.text}>
                <Text>Voittoon tarvittavat pisteet (1-20)</Text>
            </View>
            <View style={styles.valinta}>
                {voittopisteet < 2 ?
                    <TouchableOpacity style={styles.buttonFade}><Text style={styles.nappiTeksti}>-</Text></TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => MinusVoittopisteet()}><Text style={styles.nappiTeksti}>-</Text></TouchableOpacity>
                }
                <Text style={styles.nappiTeksti}>{voittopisteet}</Text>
                {voittopisteet > 19 ?
                    <TouchableOpacity style={styles.buttonFade}><Text style={styles.nappiTeksti}>+</Text></TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => PlusVoittopisteet()}><Text style={styles.nappiTeksti}>+</Text></TouchableOpacity>
                }
            </View>


            <View style={styles.nappi}>
                <Button
                    title="Aloita peli"
                    onPress={() => aloitaPeli()}

                />
            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    button: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
    buttonFade: {
        borderStyle: 'solid',
        borderColor: '#cdd0d4',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
    nappi: {
        paddingTop: 20,
        flex: 0.1,
    },
    valinta: {
        flex: 0.1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    nappiTeksti: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    lukitseButton: {
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: '#cdd0d4',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
})
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

export default function Tulossivu(props) {
    const { route } = props
    const { tulokset } = route.params
    const [tulos, setTulos] = useState(tulokset);
    const navigaatio = useNavigation();
    const [taustakuva, setTaustakuva] = useState('');

    useEffect(() => {
        TaustakuvaAsettaja();
    },)

    const TaustakuvaAsettaja = () => {
        if (tulos.tulos === 'Voitit pelin') {
            setTaustakuva("https://bit.ly/3nkPrYJ");
        } else {
            setTaustakuva("https://bit.ly/32LKpeg");
        }
    }
    return (
        <ImageBackground
            source={{ uri: taustakuva }}
            style={styles.taustakuva}
        >
            <View style={styles.container}>
                <View>
                    <Text style={styles.tekstiRivi}>{tulos.tulos}</Text>
                    <Text style={styles.tekstiRivi}>Pisteesi: {tulos.pisteesi}</Text>
                    <Text style={styles.tekstiRivi}>Vastustajan pisteet: {tulos.vastustajanPisteet}</Text>
                    <Text style={styles.tekstiRivi}>Voittoon tarvittavat pisteet: {tulos.voittoPisteet}</Text>
                </View>
                <View>
                    <TouchableHighlight
                        style={styles.siirryNappi}
                        underlayColor='#c5eba4'
                        onPress={() => navigaatio.navigate('Koti')}>
                        <Text style={styles.teksti}>Palaa etusivulle</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    teksti: {
        //marginBottom: 10,
        letterSpacing: 1.1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    tekstiRivi: {
        marginBottom: 5,
        letterSpacing: 1.1,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        color: '#c2efff'
    },
    siirryNappi: {
        marginTop: 100,
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
        height: '100%'
    }
})

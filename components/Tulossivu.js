import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

export default function Tulossivu(props) {
    const { route } = props
    const { Tulokset } = route.params
    const [tulos, setTulos] = useState(Tulokset);
    const navigation = useNavigation();
    const [taustakuva, setTaustakuva] = useState('');

    useEffect(() => {
        taustakuvaSetter();
    },)

    const taustakuvaSetter = () => {
        if (tulos.tulos === 'Voitit pelin') {
            setTaustakuva("https://bit.ly/3nkPrYJ");
        }   else {
            setTaustakuva("https://bit.ly/32LKpeg");
        }
    }
        return (
            <ImageBackground
                source={{ uri: taustakuva }}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={styles.container}>
                    <View style={styles.teksti}>
                        <Text>Tulos: {tulos.tulos}</Text>
                        <Text>Pisteesi: {tulos.Pisteesi}</Text>
                        <Text>Vastustajan pisteet: {tulos.VastustajanPisteet}</Text>
                        <Text>Voittoon tarvittavat pisteet: {tulos.VoittoPisteet}</Text>
                    </View>
                    <View style={styles.nappi}>
                        <Button
                            title="Palaa etusivulle"
                            onPress={() => navigation.navigate('Koti')}
                        />
                    </View>
                </View>
            </ImageBackground>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 3,
            //  backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            //  backgroundColor: '#c2efff',
            width: '100%'
        },

        teksti: {
            flex: 1,
          //  backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-end',
        //    backgroundColor: '#c2efff',
            width: '100%'
        },

        nappi: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 20
        },
    })

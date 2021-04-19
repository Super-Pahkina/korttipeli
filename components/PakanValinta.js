import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import {CarouselTest} from './CarouselCardItem'

export default function PakanValinta(props) {
    const [pakka, setPakka] = useState([]);
    //const [kortit, setKortit] = useState([]);
    const navigation = useNavigation();
    const isCarousel = React.useRef((c) => { this._carousel = c; })
    let { route } = props
    let { Propsit } = route.params
    let propsit = Propsit
    let url = propsit.url
    //const [state, setState] = useState({currentIndex:0});
    const [nyt, setNyt] =  useState(0);
    let kortit = pakka.slice(0, Math.round((propsit.VoittoPisteet * 2 - 1) * 1.5))
    const [valittuPakka, setValittuPakka] = useState([]);
    const [valitutIndeksit, setValitutIndeksit] = useState([])
    let tarvittavienKorttienMaara = propsit.VoittoPisteet * 2 - 1;
    let teksti = "Valitse kortteja: " + String(valittuPakka.length) + "/" + String(tarvittavienKorttienMaara);
    const [napinTeksti, setNapinTeksti] = useState(teksti);
    //this.changeIndex = this.changeIndex.bind(this);

    const changeIndex = (currentIndex) => {
        setNyt(currentIndex);
        console.log(nyt, "ny");
        console.log(currentIndex, "Indeks");
    }

    useEffect(() => {
        let mounted = true;
        const fetchCards = async () => {
            try {
                let response = await fetch(url)
                let pakkaJson = await response.json()
                if (mounted)
                    setPakka(pakkaJson)
            } catch (error) {
                console.log("ERROR FETCHISSÄ", error)
            }
        }
        fetchCards()
        return () => {
            mounted = false;
        }
    }, [])
    // TODO:
    // cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
    /*useEffect(() => {
        //const testi = valittavatKortit();
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
 */
    //Ohjataan käyttäjän vuorolle ja annetaan tarvittavat tiedot
    const aloitaPeli = () => {
        console.log(pakka.length)
        let vastuksenKortit = pakka.slice(Math.round((propsit.VoittoPisteet * 2 - 1) * 1.5))
        console.log(pakka.length)
        Propsit = {
            VoittoPisteet: propsit.VoittoPisteet,
            peliAika: propsit.peliAika,
            kaynnissa: true,
            Pisteesi: 0,
            VastustajanPisteet: 0,
            omaPakka: valittuPakka,
            vastustajanPakka: vastuksenKortit,
            pelatutKortit: 0
        }
        navigation.navigate('Kortti', { Propsit: Propsit })
    }
    /*const kasvataArvo = () => {
        String(valittuPakka.length) + "/" + String.(tarvittavienKorttienMaara);
    }*/

    //Napin painaminen lisää kortin pelattavaan pakkaan, ei duplikaatteja.
    const kokeilu = (i) => {
        console.log("NO NYTTE", i)
        if (valittuPakka.includes(pakka[i], 0)) {
            
            var x = 0;
            while (x <= valittuPakka.length) {
                if (valittuPakka[x] === pakka[i]) {
                    valittuPakka.splice(x, 1);
                    valitutIndeksit.splice(x, 1);
                }
                x++;
            }
        } else {
            valittuPakka.push(pakka[i]);
            valitutIndeksit.push(i)
        }
        teksti = "Valitse kortteja: " + String(valittuPakka.length) + "/" + String(tarvittavienKorttienMaara);
        setNapinTeksti(teksti);
    }

    const korostus = (i) => {
        const a = {
            activeOpacity: 1,
            underlayColor: 'blue',
            style: valittuPakka.includes(pakka[i], 0) ? styles.pakassa : styles.eiPakassa,
            onPress: () => console.log('HELLO'),
        }
        return a
    };

    return (
        <View style={styles.container}>
            {tarvittavienKorttienMaara == 1 ?
            <Text style={{ fontWeight: 'bold' , fontSize: 20}}>Valitse {tarvittavienKorttienMaara} kortti</Text> 
            : 
            <Text style={{ fontWeight: 'bold' , fontSize: 20}}>Valitse {tarvittavienKorttienMaara} korttia</Text>}   
            {/*Kortin tulostus*/}
            <View style={styles.carousel}>
            <TouchableWithoutFeedback style={styles.carousel} onPress={() => { kokeilu(nyt) }}>
                <Carousel
                    {...korostus()}
                    layout="stack"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    //ref={(c) => { this._carousel = c; }}
                    data={kortit.map((kortti, index) => ({kortti, valittu: valittuPakka}))}
                    renderItem={CarouselCardItem}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    sliderHeight={2000}
                    itemHeight={2000}
                    inactiveSlideShift={0}
                    useScrollView={true}
                    onSnapToItem={changeIndex}
                />
            </TouchableWithoutFeedback>
            </View>

            <View style={styles.napit}>
                <TouchableHighlight style={styles.button} underlayColor='#c5eba4' onPress={() => { kokeilu(nyt) }}>
                    {valitutIndeksit.includes(nyt) ? 
                    <Text style={styles.teksti}>Poista kortti</Text>
                    : 
                    <Text style={styles.teksti}>Valitse kortti</Text>}
                </TouchableHighlight>
            </View>
            <View style={styles.napit}>
                {valittuPakka.length == tarvittavienKorttienMaara ?
                    <Button
                        title="Aloita peli"
                        onPress={() => aloitaPeli()}
                        paddingTop= "20"
                    />
                    :
                    valittuPakka.length > tarvittavienKorttienMaara ?
                    <Button
                        color="#f22727"
                        title={napinTeksti}
                        paddingTop= "20"
                    />
                    :
                    <Button
                        color="#cdd0d4"
                        title={napinTeksti}
                        paddingTop= "20"
                    />
                }
            </View>
            

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#c2efff',
        padding: 30
        // 
    },
    carousel: {
        flex: 3,
        backgroundColor: '#c2efff',
        paddingLeft: 25
    },
    napit: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,

    },
    teksti: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    pakassa: {
        backgroundColor: 'green'
    },
    eiPakassa: {
        backgroundColor: 'red'
    }
});
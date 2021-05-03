import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageBackground, View, StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import { CarouselTest } from './CarouselCardItem'
import { Icon } from 'react-native-elements'

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
    const [nyt, setNyt] = useState(0);
    let kortit = pakka.slice(0, Math.round((propsit.VoittoPisteet * 2 - 1) * 1.5))
    const [valittuPakka, setValittuPakka] = useState([]);
    const [valitutIndeksit, setValitutIndeksit] = useState([])
    let tarvittavienKorttienMaara = propsit.VoittoPisteet * 2 - 1;
    let teksti = "Valitse kortteja: " + String(valittuPakka.length) + "/" + String(tarvittavienKorttienMaara);
    const [napinTeksti, setNapinTeksti] = useState(teksti);
    const taustakuva = { uri: propsit.kuvaUrl }
    //this.changeIndex = this.changeIndex.bind(this);

    const changeIndex = (currentIndex) => {
        setNyt(currentIndex);
        console.log(taustakuva);
        console.log(nyt, "ny");
        console.log(currentIndex, "Indeks");
        console.log("testi", propsit.ValittuElintarvikeLuokka.value);
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
        let vastuksenKortit = pakka.splice(Math.round((propsit.VoittoPisteet * 2 - 1) * 1.5))
        console.log(pakka.length)
        Propsit = {
            VoittoPisteet: propsit.VoittoPisteet,
            peliAika: propsit.peliAika,
            kaynnissa: true,
            Pisteesi: 0,
            VastustajanPisteet: 0,
            omaPakka: valittuPakka,
            vastustajanPakka: vastuksenKortit,
            pelatutKortit: 0,
            kuvaUrl: propsit.kuvaUrl,
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

    const satunnaisetKortit = () => {
        let i = 0;
        while (valittuPakka.length < tarvittavienKorttienMaara) {
            if (!valittuPakka.includes(pakka[i], 0)) {
                let valitaanko = Math.floor(Math.random() * 2)
                if (valitaanko == 1) {
                    valittuPakka.push(pakka[i])
                    valitutIndeksit.push(i)
                }
            }
            i = i + 1
            if (i == kortit.length) {
                i = 0;
            }
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
        <ImageBackground
            source={taustakuva}
            style={styles.taustakuva}>

            <View style={styles.container}>
                <Icon
                    name='home'
                    type='font-awesome'
                    size={22}
                    reverse
                    raised
                    onPress={() => navigation.navigate('Koti')}
                />
                {tarvittavienKorttienMaara == 1 ?
                    <Text style={styles.ylaTeksti}>Valitse {tarvittavienKorttienMaara} kortti</Text>
                    :
                    <Text style={styles.ylaTeksti}>Valitse {tarvittavienKorttienMaara} korttia</Text>}
                {/*Kortin tulostus*/}
                <View style={styles.carousel}>
                    <TouchableWithoutFeedback style={styles.carousel} onPress={() => { kokeilu(nyt) }}>
                        <Carousel
                            {...korostus()}
                            layout="stack"
                            layoutCardOffset={9}
                            ref={isCarousel}
                            //ref={(c) => { this._carousel = c; }}
                            data={kortit.map((kortti, index) => ({ kortti, valittu: valittuPakka }))}
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
                            <Text style={styles.ylaTeksti}>Poista kortti</Text>
                            :
                            <Text style={styles.ylaTeksti}>Valitse kortti</Text>}
                    </TouchableHighlight>
                </View>
                <View style={styles.napit}>
                    <TouchableHighlight style={styles.button} underlayColor='#c5eba4' onPress={() => { satunnaisetKortit() }}>
                        <Text style={styles.ylaTeksti}>Arvo loput kortit</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.napit}>
                    {valittuPakka.length == tarvittavienKorttienMaara ?
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => aloitaPeli()}>
                            <Text style={styles.ylaTeksti}>Aloita peli</Text>
                        </TouchableHighlight>

                        :
                        valittuPakka.length > tarvittavienKorttienMaara ?
                            <Button
                                color="#f22727"
                                title={napinTeksti}
                                paddingTop="20"
                            />
                            :
                            <Button
                                color="#cdd0d4"
                                title={napinTeksti}
                                paddingTop="20"
                            />
                    }
                </View>
            </View>
        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        // backgroundColor: '#c2efff',
        padding: 30
        // 
    },
    carousel: {
        flex: 3,
        //  backgroundColor: '#c2efff',
        paddingLeft: 25
    },
    napit: {
        flex: 0.66,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {

        justifyContent: 'flex-end',
        alignItems: "center",
        letterSpacing: 1.1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#c2efff',
        width: 200,
        borderColor: 'black',
        borderWidth: 3
    },
    ylaTeksti: {
        justifyContent: 'center',
        textAlign: 'center',
        letterSpacing: 1.1,
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        textShadowColor: 'white',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
    },
    pakassa: {
        backgroundColor: 'green'
    },
    eiPakassa: {
        backgroundColor: 'red'
    },
    taustakuva: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },

});
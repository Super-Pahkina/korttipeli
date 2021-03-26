import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Gamerules({ navigation }) {
    const [voittopisteet, setVoittopisteet] = useState(5)
    const [aika, setAika] = useState(30)
    const [pakka, setPakka] = useState([]);
    const [korttisarja, setKorttisarja] = useState({});
    const [url, setUrl] = useState('http://192.168.0.101:3001/howmany/20')

    // MUISTA VAIHTAA OMAN KONEEN IP URLEIHIN !!!!!!

    // miksi voi pelata ainoastaan yhden pelin? kun aloittaa toisen pelin heti perään tulee herja:
    /**
     * TypeError: undefined is not an object (evaluating 'chosenCard.name_fi')
     * kortti.js
     * pakka on undefined
     */
    useEffect(() => {
        urlSetter()
        console.log("URLI", url)
        fetchCards()
    }, [url][voittopisteet])

    // hakee tarvittavan määrän kortteja
    const fetchCards = async () => {
        try {
            let response = await fetch(url)
            setPakka(await response.json())
        } catch (error) {
            console.log("ERROR", error)
        }
    }

    // määrittelee fetchattavan urlin valinnan perusteella
    const urlSetter = () => {
        if (korttisarja.parent === 'raaka') {
            setUrl(`http://192.168.0.101:3001/howmany/ingredient/${voittopisteet * 4}/${korttisarja.value}`);
        }
        else if (korttisarja.parent === 'valio') {
            setUrl(`http://192.168.0.101:3001/howmany/diet/${voittopisteet * 4}/${korttisarja.value}`);
        } else {
            setUrl(`http://192.168.0.101:3001/howmany/${voittopisteet * 4}`);
        }
    }

    //Voittopiste-laskurin käyttämä funktio pisteiden kasvattamiseen
    const PlusVoittopisteet = () => {
        setVoittopisteet(voittopisteet + 1)
    }

    //Voittopiste-laskurin käyttämä funktio pisteiden vähentämiseen
    const MinusVoittopisteet = () => {
        setVoittopisteet(voittopisteet - 1)
    }

    //Aika-laskurin käyttämä funktio ajan lisäämiseen
    const PlusAika = () => {
        setAika(aika + 5)
    }

    //Aika-laskurin käyttämä funktio ajan vähentämiseen
    const MinusAika = () => {
        setAika(aika - 5)
    }

    //Ohjataan käyttäjän vuorolle ja annetaan tarvittavat tiedot
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
            <View style={{ justifyContent: 'flex-start' }}>
                <Text style={{ paddingTop: 10 }}>Valitse pelattavien elintarvikkeiden luokka,</Text>
                <Text>tai pelaa kaikilla elintarvikkeilla</Text>
                <DropDownPicker
                    items={[
                        { label: 'Raaka-aineluokat ->', value: 'raaka', untouchable: true },
                        { label: 'Lihatuotteet', value: 'meat', parent: 'raaka' },
                        { label: 'Hedelmät', value: 'fruit', parent: 'raaka' },
                        { label: 'Vihannekset', value: 'vegetables', parent: 'raaka' },
                        { label: 'Maitotuotteet', value: 'dairy', parent: 'raaka' },
                        { label: 'Viljatuotteet', value: 'grain', parent: 'raaka' },
                        { label: 'Makeat', value: 'sweet', parent: 'raaka' },
                        { label: 'Juomat', value: 'drink', parent: 'raaka' },
                        { label: 'Erikoisruokavaliot ->', value: 'valio', untouchable: true },
                        { label: 'Kolesteroliton', value: 'CHOLFREE', parent: 'valio' },
                        { label: 'Gluteeniton', value: 'GLUTFREE', parent: 'valio' },
                        { label: 'Runsaskuituinen', value: 'HIGHFIBR', parent: 'valio' },
                        { label: 'Laktoositon', value: 'LACSFREE', parent: 'valio' },
                        { label: 'Lakto-ovo-vegetaarinen', value: 'LACOVEGE', parent: 'valio' },
                        { label: 'Vähärasvainen', value: 'LOWFAT', parent: 'valio' },
                        { label: 'Vegan', value: 'VEGAN', parent: 'valio' },
                        { label: 'Kaikki tuotteet', value: 'ALL' }
                    ]}
                    placeholder='Valitse yksi'
                    multiple={false}
                    onChangeItem={item => setKorttisarja({ ...item }) || console.log("RIVI137", item)}
                    containerStyle={{ height: 40, width: 300, }}
                    labelStyle={{ fontWeight: 'bold' }}
                    itemStyle={{ justifyContent: 'flex-end' }}
                />
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
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#c2efff',
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
        paddingTop: 170,
        flex: 0.1,
    },
    valinta: {
        flex: 0.1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#c2efff',
    },
    text: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Button, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Gamerules({ navigation }) {
    const [voittopisteet, setVoittopisteet] = useState(5);
    const [aika, setAika] = useState(30);
    const [valittuElintarvikeLuokka, setValittuElintarvikeLuokka] = useState({});
    const [url, setUrl] = useState('');

    // baseUrlissa toistaiseksi oman koneen IP, koska backend ei ole vielä julkaistu
    const baseUrl = 'http://192.168.0.101:3002/howmany';

    useEffect(() => {
        urlSetter()
    }, [valittuElintarvikeLuokka])

    // Tällä sivulla määritetään fetchattava url joka siirretään propseilla eteenpäin
    const urlSetter = () => {
        if (valittuElintarvikeLuokka.parent === 'raaka') {
            setUrl(`${baseUrl}/ingredient/${voittopisteet * 5}/${valittuElintarvikeLuokka.value}`);
        }
        else if (valittuElintarvikeLuokka.parent === 'valio') {
            setUrl(`${baseUrl}/diet/${voittopisteet * 5}/${valittuElintarvikeLuokka.value}`);
        } else {
            setUrl(`${baseUrl}/${voittopisteet * 5}`);
        }
        console.log("urli", url)
    }

    // Funktiot voittoon tarvittavien pisteiden ja käytössä olevan vuoroajan määrittelemiseen
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

    // Ohjaa käyttäjän pakanvalintasivulle ja välittää tarvittavat propsit
    const aloitaPeli = () => {
        Propsit = {
            url: url,
            VoittoPisteet: voittopisteet,
            peliAika: aika,
            kaynnissa: true,
            Pisteesi: 0,
            VastustajanPisteet: 0,
            pelatutKortit: 0
        }
        navigation.navigate('PakanValinta', { Propsit: Propsit })
    }

    return (
        <View style={styles.container}>
            <View style={styles.gamerules}>
                <View style={styles.text}>
                    <Text>Valitse vuoroaika (5-60)</Text>
                </View>
                <View style={styles.valinta}>
                    {aika < 6 ?
                        <TouchableOpacity style={styles.buttonFade}>
                            <Text style={styles.nappiTeksti}>-</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => MinusAika()}>
                            <Text style={styles.nappiTeksti}>-</Text>
                        </TouchableOpacity>
                    }
                    <Text style={styles.nappiTeksti}>{aika}</Text>
                    {aika > 59 ?
                        <TouchableOpacity style={styles.buttonFade}>
                            <Text style={styles.nappiTeksti}>+</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => PlusAika()}>
                            <Text style={styles.nappiTeksti}>+</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.text}>
                    <Text>Valitse voittoon tarvittavat pisteet (1-20)</Text>
                </View>
                <View style={styles.valinta}>
                    {voittopisteet < 2 ?
                        <TouchableOpacity style={styles.buttonFade}>
                            <Text style={styles.nappiTeksti}>-</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => MinusVoittopisteet()}>
                            <Text style={styles.nappiTeksti}>-</Text>
                        </TouchableOpacity>
                    }
                    <Text style={styles.nappiTeksti}>{voittopisteet}</Text>
                    {voittopisteet > 19 ?
                        <TouchableOpacity style={styles.buttonFade}>
                            <Text style={styles.nappiTeksti}>+</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => PlusVoittopisteet()}>
                            <Text style={styles.nappiTeksti}>+</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                    <Text style={{ paddingTop: 20 }}>Valitse pelattavien elintarvikkeiden luokka,</Text>
                    <Text>tai pelaa kaikilla elintarvikkeilla</Text>
                    <DropDownPicker
                        items={[
                            { label: 'Kaikki tuotteet', value: 'ALL', textStyle: { color: 'blue', paddingLeft: 30 } },
                            { label: 'Raaka-aineluokat (7):', value: 'raaka', untouchable: true, textStyle: { fontWeight: 'bold' } },
                            { label: 'Lihatuotteet', value: 'meat', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Hedelmät', value: 'fruit', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Maitotuotteet', value: 'dairy', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Vihannekset', value: 'vegetable', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Viljatuotteet', value: 'grain', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Makeat', value: 'sweet', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Juomat', value: 'drink', parent: 'raaka', textStyle: { color: 'blue' } },
                            { label: 'Erikoisruokavaliot (7):', value: 'valio', untouchable: true, textStyle: { fontWeight: 'bold' } },
                            { label: 'Kolesteroliton', value: 'CHOLFREE', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Gluteeniton', value: 'GLUTFREE', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Runsaskuituinen', value: 'HIGHFIBR', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Laktoositon', value: 'LACSFREE', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Lakto-ovovegetaarinen', value: 'LACOVEGE', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Vähärasvainen', value: 'LOWFAT', parent: 'valio', textStyle: { color: 'blue' } },
                            { label: 'Vegan', value: 'VEGAN', parent: 'valio', textStyle: { color: 'blue' } },
                        ]}
                        placeholder='Valitse'
                        multiple={false}
                        onChangeItem={item => setValittuElintarvikeLuokka({ ...item })}
                        containerStyle={{ height: 40, width: 300, }}
                        style={{ backgroundColor: '#e0f7ff' }}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                    />
                </View>
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
    gamerules: {
        flex: 3,
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
        paddingTop: 170,
        flex: 0.5,
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
        flex: 0.2,
        paddingBottom: 5,
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
})
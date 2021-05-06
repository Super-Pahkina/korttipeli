import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, Text, Button, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

export default function PelinAsetukset() {
    const [voittopisteet, setVoittopisteet] = useState(5);
    const [aika, setAika] = useState(30);
    const [valittuElintarvikeLuokka, setValittuElintarvikeLuokka] = useState({});
    const [url, setUrl] = useState('');
    const navigaatio = useNavigation();
    const [kuvaUrl, setKuvaUrl] = useState('');
    const alkuUrl = 'https://elintarvikepeli.herokuapp.com/howmany';
    const taustakuva = { uri: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80' }
    useEffect(() => {
        UrlAsettaja();
    }, [valittuElintarvikeLuokka])

    // Tällä sivulla määritetään fetchattava url joka siirretään propseilla eteenpäin
    const UrlAsettaja = () => {
        if (valittuElintarvikeLuokka.parent === 'raaka') {
            setUrl(`${alkuUrl}/ingredient/${voittopisteet * 5}/${valittuElintarvikeLuokka.value}`);
            setKuvaUrl("https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80")
        }
        else if (valittuElintarvikeLuokka.parent === 'valio') {
            setUrl(`${alkuUrl}/diet/${voittopisteet * 5}/${valittuElintarvikeLuokka.value}`);
            if (valittuElintarvikeLuokka.value === 'CHOLFREE') {
                setKuvaUrl("https://source.unsplash.com/1600x900/?oatmeal")
            } else if (valittuElintarvikeLuokka.value === 'GLUTFREE') {
                setKuvaUrl("https://bit.ly/3gVJgZM");
            }
            else if (valittuElintarvikeLuokka.value === 'HIGHFIBR') {
                setKuvaUrl("https://bit.ly/3dRscCv");
            }
            else if (valittuElintarvikeLuokka.value === 'LACSFREE') {
                setKuvaUrl("https://bit.ly/2PmC51p");
            }
            else if (valittuElintarvikeLuokka.value === 'LACOVEGE') {
                setKuvaUrl("https://bit.ly/3xrK7HJ");
            }
            else if (valittuElintarvikeLuokka.value === 'LOWFAT') {
                setKuvaUrl("https://bit.ly/3sNlFwF");
            }
            else if (valittuElintarvikeLuokka.value === 'VEGAN') {
                setKuvaUrl("https://bit.ly/3aFhblP");
            }
        } else {
            setUrl(`${alkuUrl}/${voittopisteet * 5}`);
            setKuvaUrl("https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=637&q=80")
        }
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
    const AloitaPeli = () => {
        let Propsit = {
            url: url,
            voittoPisteet: voittopisteet,
            peliAika: aika,
            kaynnissa: true,
            pisteesi: 0,
            vastustajanPisteet: 0,
            pelatutKortit: 0,
            valittuElintarvikeLuokka: valittuElintarvikeLuokka,
            kuvaUrl: kuvaUrl,
        }
        navigaatio.navigate('PakanValinta', { Propsit: Propsit })
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={taustakuva}
                style={styles.taustakuva}
            >
                <View style={styles.pelinAsetukset}>

                    <View style={styles.kuvausJaNapit}>
                        <Text></Text>
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={22}
                            reverse
                            raised
                            onPress={() => navigaatio.navigate('Koti')}
                        />
                        <Text style={styles.teksti}>Valitse vuoroaika (10-60)</Text>

                        <View style={styles.valinta}>
                            {aika < 11 ?
                                <TouchableOpacity style={styles.plusTaiMiinusNappiEiAktiivinen}>
                                    <Text style={styles.nappiTeksti}>-</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.plusTaiMiinusNappi} onPress={() => MinusAika()}>
                                    <Text style={styles.nappiTeksti}>-</Text>
                                </TouchableOpacity>
                            }
                            <Text style={styles.nappiTeksti}>{aika}</Text>
                            {aika > 59 ?
                                <TouchableOpacity style={styles.plusTaiMiinusNappiEiAktiivinen}>
                                    <Text style={styles.nappiTeksti}>+</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.plusTaiMiinusNappi} onPress={() => PlusAika()}>
                                    <Text style={styles.nappiTeksti}>+</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>


                    <View style={styles.kuvausJaNapit}>
                        <Text style={styles.teksti}>Valitse voittoon tarvittavat pisteet (1-10)</Text>

                        <View style={styles.valinta}>
                            {voittopisteet < 2 ?
                                <TouchableOpacity style={styles.plusTaiMiinusNappiEiAktiivinen}>
                                    <Text style={styles.nappiTeksti}>-</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.plusTaiMiinusNappi} onPress={() => MinusVoittopisteet()}>
                                    <Text style={styles.nappiTeksti}>-</Text>
                                </TouchableOpacity>
                            }
                            <Text style={styles.nappiTeksti}>{voittopisteet}</Text>
                            {voittopisteet > 9 ?
                                <TouchableOpacity style={styles.plusTaiMiinusNappiEiAktiivinen}>
                                    <Text style={styles.nappiTeksti}>+</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.plusTaiMiinusNappi} onPress={() => PlusVoittopisteet()}>
                                    <Text style={styles.nappiTeksti}>+</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <View style={styles.dropdownValikko}>
                        <Text style={styles.teksti}>Valitse pelattavien elintarvikkeiden luokka, tai pelaa kaikilla elintarvikkeilla</Text>

                        <DropDownPicker
                            items={[
                                { label: 'Kaikki tuotteet', value: 'ALL', textStyle: { color: 'blue', paddingLeft: 30, letterSpacing: 1.1 } },
                                { label: 'Raaka-aineluokat (7):', value: 'raaka', untouchable: true, textStyle: { fontWeight: 'bold', letterSpacing: 1.1 } },
                                { label: 'Lihatuotteet', value: 'meat', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Hedelmät', value: 'fruit', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Maitotuotteet', value: 'dairy', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Vihannekset', value: 'vegetable', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Viljatuotteet', value: 'grain', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Makeat', value: 'sweet', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Juomat', value: 'drink', parent: 'raaka', textStyle: { color: 'blue', letterSpacing: 1.1, } },
                                { label: 'Erikoisruokavaliot (7):', value: 'valio', untouchable: true, textStyle: { fontWeight: 'bold', letterSpacing: 1.1 } },
                                { label: 'Kolesteroliton', value: 'CHOLFREE', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Gluteeniton', value: 'GLUTFREE', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Runsaskuituinen', value: 'HIGHFIBR', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Laktoositon', value: 'LACSFREE', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Lakto-ovovegetaarinen', value: 'LACOVEGE', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Vähärasvainen', value: 'LOWFAT', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                                { label: 'Vegan', value: 'VEGAN', parent: 'valio', textStyle: { color: 'blue', letterSpacing: 1.1 } },
                            ]}
                            placeholder='Kaikki tuotteet'
                            multiple={false}
                            onChangeItem={item => setValittuElintarvikeLuokka({ ...item })}
                            containerStyle={{ height: 40, width: 300 }}
                            style={{ backgroundColor: '#e0f7ff' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                        />
                    </View>
                </View>
            

            <View style={styles.aloitaPeliView}>
                <TouchableOpacity
                    style={styles.aloitaPeliNappi}
                    onPress={() => AloitaPeli()}
                ><Text style={styles.painikkeenTeksti}>Aloita peli</Text></TouchableOpacity>
            </View>
        </ImageBackground>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#c2efff',
    },
    pelinAsetukset: {
        justifyContent: 'center',
        width: '100%'
    },
    plusTaiMiinusNappi: {
        alignItems: "center",
        justifyContent: 'center',
        letterSpacing: 1.1,
        borderRadius: 10,
        padding: 5,
        width: 100,
        margin: 20,
        borderColor: 'black',
        backgroundColor: '#c2efff',
        borderWidth: 3,
    },
    plusTaiMiinusNappiEiAktiivinen: {
        alignItems: "center",
        justifyContent: 'center',
        letterSpacing: 1.1,
        borderRadius: 10,
        padding: 5,
        width: 100,
        margin: 20,
        borderColor: 'gray',
        borderWidth: 3,
    },
    aloitaPeliNappi: {
        justifyContent: 'flex-end',
        alignItems: "center",
        letterSpacing: 1.1,
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#c2efff',
        width: 200,
        borderColor: 'black',
        borderWidth: 3,
    },
    aloitaPeliView: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    valinta: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    teksti: {
        marginBottom: 10,
        letterSpacing: 1.1,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        color: '#c2efff'
    },
    painikkeenTeksti: {
        padding: 10,
        letterSpacing: 1.1,
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    kuvausJaNapit: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nappiTeksti: {
        letterSpacing: 1.1,
        fontWeight: 'bold',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownValikko: {
        alignItems: 'center',
        minHeight: 250,
        justifyContent: 'flex-start',
    },
    taustakuva: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },
})

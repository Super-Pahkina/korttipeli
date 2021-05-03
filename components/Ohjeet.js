import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const taustakuva = { uri: "https://bit.ly/3eNbKCo" };

export default function Ohjeet() {
    const navigation = useNavigation();

    return (

        <View style={styles.container}>

            <ImageBackground source={taustakuva} style={styles.taustakuva}>
                <View style={styles.kotiIkoni}>
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={22}
                        reverse
                        raised
                        onPress={() => navigation.navigate('Koti')}
                    />
                </View>
                <ScrollView style={styles.rullausnakyma}>

                    <CollapsibleView title={<Text style={styles.otsikko}>Pelin kulku lyhyesti</Text>} style={styles.valikko}>

                        <Text style={styles.teksti}>
                            {'\n'}Ennen pelin aloitusta voit määritellä asetuksia, asetukset on näytetty alempana.{'\n\n'}
                        Omalla vuorollaan pelaaja valitsee elintarvikekortista ravintoarvon, jonka arvelee
                        olevan arvoltaan suurempi kuin vastustajalla. Se, jolla on suurempi arvo, saa pisteen.
                        Tasapelitilanteessa molemmat saavat pisteen.{'\n\n'}
                        Ravintosisältö perustuu 100g määrään elintarviketta.{'\n'}
                        </Text>
                    </CollapsibleView>

                    <CollapsibleView title={<Text style={styles.otsikko}>Pelin asetukset</Text>} style={styles.valikko}>
                        <Text style={styles.teksti}>{'\n'}Gamerules-sivulla voit määritellä seuravat asetukset:{'\n'}</Text>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Ajan asetus</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>{'\n'}Voit määrittää vuorosi keston painamalla '-' tai '+' -painiketta 'Vuoroaika (5-60)' kohdalla.{'\n'}
                            </Text>
                        </CollapsibleView>

                        <CollapsibleView title={<Text style={styles.alaotsikko}>Voittopisteiden asetus</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>{'\n'}Voit määrittää voittoon tarvittavien pisteiden määrän painamalla '-' tai '+' -painikkeita
                        'Voittoon tarvittavat pisteet (1-20)' kohdalla.{'\n'}
                            </Text>
                        </CollapsibleView>

                        <CollapsibleView title={<Text style={styles.alaotsikko}>Kategorian asetus</Text>} style={styles.valikko}>

                            <Text style={styles.teksti}>{'\n'}Voit valita yhden seuraavista elintarvikekategorioista:{'\n'}</Text>

                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Liha</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Liha-, kala-, ja kanatuotteet</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Hedelmät</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Hedelmät ja marjat</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Vihannekset</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Juurekset, kasvikset ja sienet</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Maitotuotteet</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Maidot, juustot, jogurtit, jäätelöt</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Viljatuotteet</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Pastat, riisit, ohrat, kaurat, vehnät, rukiit</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Juomat</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Maitojuomat, kasvisjuomat, kahvit ja teet, virvoitusjuomat</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Makeat</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>Jäätelöt, makeiset, suklaat, hillot, virvoitusjuomat</Text>
                            </CollapsibleView>

                            <Text style={styles.teksti}>{'\n'}Tai yhden seuraavista erikoisruokavalioista:{'\n'}</Text>

                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Kolesteroliton</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Sydän- ja verisuonisairausten ja diabeteksen ruokavaliohoidossa vähennetään runsaasti kolesterolia sisältävien elintarvikkeiden käyttöä.{'\n\n'}
                                Finelin verkkopalvelussa kolesterolittomaan ruokavalioon on valittu elintarvikkeet, jotka sisältävät kolesterolia enintään 5 mg/100 g elintarviketta.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Gluteeniton</Text>} style={styles.valikko}>
                                <Text style={styles.text}>
                                    {'\n'}Keliakian ruokavaliohoitoon soveltuvat elintarvikkeet, jotka eivät sisällä vehnää, ruista eikä ohraa.{'\n\n'}Kauran käyttö
                                on mahdollista edellyttäen, että hoitava lääkäri seuraa taudin kulkua. Kauraa ei ole valittu gluteenittomaan ruokavalioon.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Runsaskuituinen</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Runsaskuituinen ruokavalio soveltuu hyvin kaikille, erityisesti laihduttajille sekä diabeteksen, sydän- ja verisuonisairauksien sekä ummetuksen hoitoon.{'\n\n'}
                                Runsaskuituiseen ruokavalioon on valittu elintarvikkeet, jotka sisältävät vähintään 6 g kuitua sataa grammaa elintarviketta kohden.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Laktoositon</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Laktoosin imeytymishäiriossä maitosokerin eli laktoosin pilkkoutuminen vähenee, mikä johtuu laktaasientsyymin puutoksesta.{'\n\n'}
                                Laktoosin imeytymishäiriön ruokavaliohoidossa vähennetään laktoosia sisältävien elintarvikkeiden käyttöä.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Lakto-ovovegetaarinen</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Lakto-ovo-vegetaariseen ruokavalioon sisältyy kasvikunnan tuotteiden lisäksi maitovalmisteita ja kananmunaa.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Vähärasvainen</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Vähärasvaiseen ruokavalioon soveltuviksi elintarvikkeiksi
                                on valittu elintarvikkeet, jotka sisältävät vähemmän rasvaa kuin vastaavat elintarvikkeet samassa elintarvikeryhmässä.{'\n'}</Text>
                            </CollapsibleView>
                            <CollapsibleView title={<Text style={styles.alaotsikko2}>Vegaaninen</Text>} style={styles.valikko}>
                                <Text style={styles.teksti}>
                                    {'\n'}Vegaaniseen ruokavalioon sisältyy pelkästään kasvikunnan tuotteita.{'\n'}</Text>
                            </CollapsibleView>

                        </CollapsibleView>
                    </CollapsibleView>

                    <CollapsibleView title={<Text style={styles.otsikko}>Erikoiskortit</Text>} style={styles.valikko}>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Timanttikortti</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Timanttikortissa yksi tai useampi ravintoarvo on huomattavasti keskimääräistä korkeampi,
                            joten voittotodennäköisyys on suuri.{'\n\n'}Jos kierroksen häviää pelattuaan timanttikortin, vastustaja saa ylimääräisen pisteen.
                            {'\n\n'}Timanttikortin tunnistaa elintarvikkeen nimen edessä olevasta timantti-ikonista:{'\n\n'}
                            </Text>
                            <Icon
                                name='diamond'
                                type='font-awesome'
                                size={60}
                            />
                            <Text>{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Lumihiutalekortti</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Lumikortissa kaikki ravintoarvot ovat keskimääräistä alhaisemmat,
                            joten voittotodennäköisyys on pieni. {'\n\n'}Jos kierroksen voittaa pelattuaan lumikortin, käyttäjä saa ylimääräisen pisteen.
                            {'\n\n'}Lumikortin tunnistaa elintarvikkeen nimen edessä olevasta lumihiutaleikonista:{'\n\n'}
                            </Text>
                            <Icon
                                name='snowflake-o'
                                type='font-awesome'
                                size={60}
                            />
                            <Text>{'\n'}</Text>
                        </CollapsibleView>
                    </CollapsibleView>
                    <CollapsibleView title={<Text style={styles.otsikko}>Pelaaminen</Text>} style={styles.valikko}>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Pakan valinta</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Käyttäjä siirtyy pakanvalintasivulle, jossa on mahdollisuus valita ruudulla olevista
                            vaihtoehdoista elintarvikekortteja omaan pakkaan tai arpoa pelattavat kortit.{'\n'}
                            </Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Käyttäjän vuoro</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Peli alkaa käyttäjän vuorolla, jonka aikana hän voi valita pakastaan
                        pelattavan elintarvikekortin.{'\n\n'}Valitusta kortista valitaan ravintoarvo, joka todennäköisimmin
                        on suurempi kuin vastustajalla.{'\n'}
                            </Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Kierroksen tulos</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Ruudulle tulostuu pelatun kierroksen tulos. Ruudun yläosassa näkyy vastustajan kortti.
                            Käyttäjän pelaama kortti on ruudun alaosassa.{'\n\n'}Jokaisen ravintoarvon perään tulostuu värillinen
                            ikoni kuvaamaan, oliko kortilla oleva kyseinen ravintoarvo suurempi, pienempi tai yhtäsuuri kuin vastustajalla.{'\n\n'}
                            Käyttäjä saa pisteen mikäli käyttäjän kortilla oleva valittu ravintoarvo on suurempi tai yhtäsuuri kuin vastustajalla.{'\n'}
                            </Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.alaotsikko}>Vastustajan vuoro</Text>} style={styles.valikko}>
                            <Text style={styles.teksti}>
                                {'\n'}Vuoro siirtyy vastustajalle. Ruudun yläreunaan tulostuu vastustajan valitsema ravintoarvokategoria.{'\n\n'}
                            Käyttäjä valitsee omasta pakastaan mielestään sopivimman kortin pelattavaksi vastustajan valitsemaa kategoriaa vastaan.
                            Peli siirtyy kierroksen tulossivulle. {'\n\n'}
                            Peli jatkuu vuorotellen käyttäjän ja vastustajan vuoroilla, kunnes alussa asetettu voittopistemäärä on saavutettu.{'\n'}

                            </Text>
                        </CollapsibleView>
                    </CollapsibleView>
                </ScrollView>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    kontti: {
        flex: 1,
        backgroundColor: '#c2efff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    kotiIkoni: {
        alignItems: 'center',
        marginTop: 20
    },
    teksti: {
        fontSize: 14,
        letterSpacing: 1.1
    },
    rullausnakyma: {
        width: '90%'
    },
    valikko: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderRadius: 15,
        padding: 10,
        borderWidth: 3
    },
    otsikko: {
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'
    },
    alaotsikko: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'

    },
    alaotsikko2: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'

    },
    taustakuva: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },
});
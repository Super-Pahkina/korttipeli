import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { Icon } from 'react-native-elements'


export default function Ohjeet() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>

                <CollapsibleView title={<Text style={styles.title}>Pelin kulku lyhyesti</Text>} style={styles.collapsibleview}>

                    <Text style={styles.text}>
                        {'\n'}Ennen pelin aloitusta voit määritellä asetuksia, asetukset on näytetty alempana.{'\n\n'}
                        Omalla vuorollaan pelaaja valitsee elintarvikekortista ravintoarvon, jonka arvelee
                        olevan arvoltaan suurempi kuin vastustajalla. Se, jolla on suurempi arvo, saa pisteen.
                        Tasapelitilanteessa molemmat saavat pisteen.{'\n\n'}
                        Ravintosisältö perustuu 100g määrään elintarviketta.{'\n'}
                    </Text>
                </CollapsibleView>

                <CollapsibleView title={<Text style={styles.title}>Pelin asetukset</Text>} style={styles.collapsibleview}>
                    <Text style={styles.text}>{'\n'}Gamerules-sivulla voit määritellä seuravat asetukset:{'\n'}</Text>
                    <CollapsibleView title={<Text style={styles.subtitle}>Ajan asetus</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>{'\n'}Voit määrittää vuorosi keston painamalla '-' tai '+' -painiketta 'Vuoroaika (5-60)' kohdalla.{'\n'}
                        </Text>
                    </CollapsibleView>

                    <CollapsibleView title={<Text style={styles.subtitle}>Voittopisteiden asetus</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>{'\n'}Voit määrittää voittoon tarvittavien pisteiden määrän painamalla '-' tai '+' -painikkeita
                        'Voittoon tarvittavat pisteet (1-20)' kohdalla.{'\n'}
                        </Text>
                    </CollapsibleView>

                    <CollapsibleView title={<Text style={styles.subtitle}>Kategorian asetus</Text>} style={styles.collapsibleview}>

                        <Text style={styles.text}>{'\n'}Voit valita yhden seuraavista elintarvikekategorioista:{'\n'}</Text>

                        <CollapsibleView title={<Text style={styles.subtitle2}>Liha</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Liha-, kala-, ja kanatuotteet</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Hedelmät</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Hedelmät ja marjat</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Vihannekset</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Juurekset, kasvikset ja sienet</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Maitotuotteet</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Maidot, juustot, jogurtit, jäätelöt</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Viljatuotteet</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Pastat, riisit, ohrat, kaurat, vehnät, rukiit</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Juomat</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Maitojuomat, kasvisjuomat, kahvit ja teet, virvoitusjuomat</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Makeat</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>Jäätelöt, makeiset, suklaat, hillot, virvoitusjuomat</Text>
                        </CollapsibleView>

                        <Text style={styles.text}>{'\n'}Tai yhden seuraavista erikoisruokavalioista:{'\n'}</Text>

                        <CollapsibleView title={<Text style={styles.subtitle2}>Kolesteroliton</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Sydän- ja verisuonisairausten ja diabeteksen ruokavaliohoidossa vähennetään runsaasti kolesterolia sisältävien elintarvikkeiden käyttöä.{'\n\n'}
                                Finelin verkkopalvelussa kolesterolittomaan ruokavalioon on valittu elintarvikkeet, jotka sisältävät kolesterolia enintään 5 mg/100 g elintarviketta.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Gluteeniton</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Keliakian ruokavaliohoitoon soveltuvat elintarvikkeet, jotka eivät sisällä vehnää, ruista eikä ohraa.{'\n\n'}Kauran käyttö
                                on mahdollista edellyttäen, että hoitava lääkäri seuraa taudin kulkua. Kauraa ei ole valittu gluteenittomaan ruokavalioon.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Runsaskuituinen</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Runsaskuituinen ruokavalio soveltuu hyvin kaikille, erityisesti laihduttajille sekä diabeteksen, sydän- ja verisuonisairauksien sekä ummetuksen hoitoon.{'\n\n'}
                                Runsaskuituiseen ruokavalioon on valittu elintarvikkeet, jotka sisältävät vähintään 6 g kuitua sataa grammaa elintarviketta kohden.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Laktoositon</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Laktoosin imeytymishäiriossä maitosokerin eli laktoosin pilkkoutuminen vähenee, mikä johtuu laktaasientsyymin puutoksesta.{'\n\n'}
                                Laktoosin imeytymishäiriön ruokavaliohoidossa vähennetään laktoosia sisältävien elintarvikkeiden käyttöä.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Lakto-ovovegetaarinen</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Lakto-ovo-vegetaariseen ruokavalioon sisältyy kasvikunnan tuotteiden lisäksi maitovalmisteita ja kananmunaa.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Vähärasvainen</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Vähärasvaiseen ruokavalioon soveltuviksi elintarvikkeiksi
                                on valittu elintarvikkeet, jotka sisältävät vähemmän rasvaa kuin vastaavat elintarvikkeet samassa elintarvikeryhmässä.{'\n'}</Text>
                        </CollapsibleView>
                        <CollapsibleView title={<Text style={styles.subtitle2}>Vegaaninen</Text>} style={styles.collapsibleview}>
                            <Text style={styles.text}>
                                {'\n'}Vegaaniseen ruokavalioon sisältyy pelkästään kasvikunnan tuotteita.{'\n'}</Text>
                        </CollapsibleView>

                    </CollapsibleView>
                </CollapsibleView>

                <CollapsibleView title={<Text style={styles.title}>Erikoiskortit</Text>} style={styles.collapsibleview}>
                    <CollapsibleView title={<Text style={styles.subtitle}>Timanttikortti</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
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
                    <CollapsibleView title={<Text style={styles.subtitle}>Lumihiutalekortti</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
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
                <CollapsibleView title={<Text style={styles.title}>Pelaaminen</Text>} style={styles.collapsibleview}>
                    <CollapsibleView title={<Text style={styles.subtitle}>Pakan valinta</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
                            {'\n'}Käyttäjä siirtyy pakanvalintasivulle, jossa on mahdollisuus valita ruudulla olevista
                            vaihtoehdoista elintarvikekortteja omaan pakkaan tai arpoa pelattavat kortit.{'\n'}
                        </Text>
                    </CollapsibleView>
                    <CollapsibleView title={<Text style={styles.subtitle}>Käyttäjän vuoro</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
                            {'\n'}Peli alkaa käyttäjän vuorolla, jonka aikana hän voi valita pakastaan
                        pelattavan elintarvikekortin.{'\n\n'}Valitusta kortista valitaan ravintoarvo, joka todennäköisimmin
                        on suurempi kuin vastustajalla.{'\n'}
                        </Text>
                    </CollapsibleView>
                    <CollapsibleView title={<Text style={styles.subtitle}>Kierroksen tulos</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
                            {'\n'}Ruudulle tulostuu pelatun kierroksen tulos. Ruudun yläosassa näkyy vastustajan kortti.
                            Käyttäjän pelaama kortti on ruudun alaosassa.{'\n\n'}Jokaisen ravintoarvon perään tulostuu värillinen
                            ikoni kuvaamaan, oliko kortilla oleva kyseinen ravintoarvo suurempi, pienempi tai yhtäsuuri kuin vastustajalla.{'\n\n'}
                            Käyttäjä saa pisteen mikäli käyttäjän kortilla oleva valittu ravintoarvo on suurempi tai yhtäsuuri kuin vastustajalla.{'\n'}
                        </Text>
                    </CollapsibleView>
                    <CollapsibleView title={<Text style={styles.subtitle}>Vastustajan vuoro</Text>} style={styles.collapsibleview}>
                        <Text style={styles.text}>
                            {'\n'}Vuoro siirtyy vastustajalle. Ruudun yläreunaan tulostuu vastustajan valitsema ravintoarvokategoria.{'\n\n'}
                            Käyttäjä valitsee omasta pakastaan mielestään sopivimman kortin pelattavaksi vastustajan valitsemaa kategoriaa vastaan.
                            Peli siirtyy kierroksen tulossivulle. {'\n\n'}
                            Peli jatkuu vuorotellen käyttäjän ja vastustajan vuoroilla, kunnes alussa asetettu voittopistemäärä on saavutettu.{'\n'}

                        </Text>
                    </CollapsibleView>
                </CollapsibleView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c2efff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        letterSpacing: 1.1
    },
    scrollview: {
        width: '90%'

    },
    collapsibleview: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        borderRadius: 15,
        padding: 10,
        borderWidth: 3
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'

    },
    subtitle2: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#7F5CF3'

    }
});
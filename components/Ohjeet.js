import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

export default function Ohjeet() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>

                <CollapsibleView title="Pelin kulku lyhyesti" style={styles.collapsibleview}>
                    <Text>{'\n'}</Text>
                    <Text>Ennen pelin aloitusta voit määritellä asetuksia, asetuksets on näytetty alempana.</Text>
                </CollapsibleView>

                <CollapsibleView title="Pelin asetukset" style={styles.collapsibleview}>
                    <Text>Gamerules-sivulla voit määritellä seuravat asetukset:{'\n'}</Text>
                    <CollapsibleView title="Ajan asetus" style={styles.collapsibleview}>
                        <Text>Voit määrittää vuorosi keston painamalla '-' tai '+' -painiketta 'Vuoroaika (5-60)' kohdalla.
                        </Text>
                    </CollapsibleView>

                    <CollapsibleView title="Voittopisteiden asetus" style={styles.collapsibleview}>
                        <Text>Voit määrittää voittoon tarvittavien pisteiden määrän painamalla '-' tai '+' -painikkeita
                        'Voittoon tarvittavat pisteet (1-20)' kohdalla.
                        </Text>
                    </CollapsibleView>

                    <CollapsibleView title="Kategorian asetus" style={styles.collapsibleview}>

                        <Text>Voit valita yhden seuraavista elintarvikekategorioista:{'\n'}</Text>

                        <CollapsibleView title="Liha" style={styles.collapsibleview}>
                            <Text>Liha-, kala-, ja kanatuotteet</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Hedelmät" style={styles.collapsibleview}>
                            <Text>Hedelmät ja marjat</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Vihannekset" style={styles.collapsibleview}>
                            <Text>Juurekset, kasvikset ja sienet</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Maitotuotteet" style={styles.collapsibleview}>
                            <Text>Maidot, juustot, jogurtit, jäätelöt ym...</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Viljatuotteet" style={styles.collapsibleview}>
                            <Text>Pastat, riisit, ohrat, kaurat, vehnät, rukiit ym...</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Juomat" style={styles.collapsibleview}>
                            <Text>Maitojuomat, kasvisjuomat, kahvit ja teet, virvoitusjuomat ym...</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Makeat" style={styles.collapsibleview}>
                            <Text>Jäätelöt, makeiset, suklaat, hillot, virvoitusjuomat</Text>
                        </CollapsibleView>

                        <Text>{'\n'}Tai yhden seuraavista erikoisruokavalioista:{'\n'}</Text>

                        <CollapsibleView title="Kolesteroliton" style={styles.collapsibleview}>
                            <Text>Sydän- ja verisuonisairausten ja diabeteksen ruokavaliohoidossa vähennetään runsaasti kolesterolia sisältävien elintarvikkeiden käyttöä.
                                Finelin verkkopalvelussa kolesterolittomaan ruokavalioon on valittu elintarvikkeet, jotka sisältävät kolesterolia enintään 5 mg/100 g elintarviketta.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Gluteeniton" style={styles.collapsibleview}>
                            <Text>Keliakian ruokavaliohoitoon soveltuvat elintarvikkeet, jotka eivät sisällä vehnää, ruista eikä ohraa. Kauran käyttö
                                on mahdollista edellyttäen, että hoitava lääkäri seuraa taudin kulkua. Kauraa ei ole valittu gluteenittomaan ruokavalioon.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Runsaskuituinen" style={styles.collapsibleview}>
                            <Text>Runsaskuituinen ruokavalio soveltuu hyvin kaikille, erityisesti laihduttajille sekä diabeteksen, sydän- ja verisuonisairauksien sekä ummetuksen hoitoon.
                                Runsaskuituiseen ruokavalioon on valittu elintarvikkeet, jotka sisältävät vähintään 6 g kuitua sataa grammaa elintarviketta kohden.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Laktoositon" style={styles.collapsibleview}>
                            <Text>Laktoosin imeytymishäiriossä maitosokerin eli laktoosin pilkkoutuminen vähenee, mikä johtuu laktaasientsyymin puutoksesta.
                                Laktoosin imeytymishäiriön ruokavaliohoidossa vähennetään laktoosia sisältävien elintarvikkeiden käyttöä.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Lakto-ovovegetaarinen" style={styles.collapsibleview}>
                            <Text>Lakto-ovo-vegetaariseen ruokavalioon sisältyy kasvikunnan tuotteiden lisäksi maitovalmisteita ja kananmunaa.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Vähärasvainen" style={styles.collapsibleview}>
                            <Text>Vähärasvaiseen ruokavalioon soveltuviksi elintarvikkeiksi
                                on valittu elintarvikkeet, jotka sisältävät vähemmän rasvaa kuin vastaavat elintarvikkeet samassa elintarvikeryhmässä.</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Vegan" style={styles.collapsibleview}>
                            <Text>Vegaaniseen ruokavalioon sisältyy pelkästään kasvikunnan tuotteita.</Text>
                        </CollapsibleView>

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
        fontSize: 28,
        fontWeight: "bold",
    },
    scrollview: {
        width: '90%'

    },
    collapsibleview: {
        backgroundColor: 'white',
        alignItems: 'flex-start'
    }
});
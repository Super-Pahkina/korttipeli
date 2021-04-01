import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

export default function Ohjeet() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview}>

                <CollapsibleView title="Pelistä" style={styles.collapsibleview}>
                    <Text>Tämä on tietoa Pelistä</Text>
                </CollapsibleView>

                <CollapsibleView title="Pelin asetukset" style={styles.collapsibleview}>

                    <CollapsibleView title="Ajan asetus" style={styles.collapsibleview}>
                        <Text>Tämä on tietoa ajasta</Text>
                    </CollapsibleView>

                    <CollapsibleView title="Voittopisteiden asetus" style={styles.collapsibleview}>
                        <Text>Tämä on tietoa Pelistä</Text>
                    </CollapsibleView>

                    <CollapsibleView title="Kategorian asetus" style={styles.collapsibleview}>

                        <Text>Voit valita yhden seuraavista elintarvikekategorioista:{'\n'}</Text>

                        <CollapsibleView title="Liha" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Hedelmät" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Vihannekset" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Maitotuotteet" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Viljatuotteet" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Juomat" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>
                        <CollapsibleView title="Makeat" style={styles.collapsibleview}>
                            <Text>Tämä on tietoa Pelistä</Text>
                        </CollapsibleView>

                        <Text>{'\n'}Tai yhden seuraavista erikoisruokavalioista:</Text>

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
                                Runsaskuituiseen ruokavalioon on valittu elintarvikkeet, jotka sisältävät vähintään 6 g kuitua sataa grammaa elintarviketta kohden</Text>
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
        backgroundColor: '#fff',
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
        alignItems: 'flex-start'
    }
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native"
import { Card } from 'react-native-elements'
import testi from "./PakanValinta";

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
export const SLIDER_HEIGHT = Dimensions.get('window').height + 900
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.9)


const CarouselCardItem = ({ item, index }) => {

  let elintarvike = ({
    name: `${item.name_fi}`,
    nutrition: {
      salt: `${item.salt}`,
      energyKcal: `${item.energyKcal}`,
      fat: `${item.fat}`,
      protein: `${item.protein}`,
      carbohydrate: `${item.carbohydrate}`,
      sugar: `${item.sugar}`,
      fiber: `${item.fiber}`,
    }
  })

  const labels = {
    salt: "Suola (mg)",
    energyKcal: "Energia (Kcal)",
    fat: "Rasva (g)",
    protein: "Proteiini (g)",
    carbohydrate: "Hiilihydraatit (g)",
    sugar: "Sokeri (g)",
    fiber: "Kuitu (g)"
  }
  let ravintoarvot = Object.keys(elintarvike.nutrition);
  ['salt', 'energyKcal', 'fat', 'protein', 'carbohydrate', 'sugar', 'fiber']

  const valintaNappi = () => {
    testi(elintarvike);
  }

  return (
    <Card containerStyle={styles.kortti}>
      <Card.Title>{elintarvike.name}</Card.Title>
      {ravintoarvot.map((ravintoarvo, index) => (
        <View style={styles.rivi}>
          <Text style={styles.name}>{labels[ravintoarvo]}:  </Text>
          <Text style={styles.nutrition}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
        </View>
      ))}
      {//<TouchableHighlight style={styles.button} underlayColor='#808791' onPress={() => valintaNappi()}><Text >Valitse</Text></TouchableHighlight>
      }
    </Card>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: "#c2efff"
  },
  arvot: {
    flexDirection: 'row'
  },
  divider: {
    backgroundColor: '#808791',
    height: 1.5,
  },
  nutrition: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'brown',
  },
  name: {
    fontSize: 15,
    width: 160,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderColor: '#808791',
    borderWidth: 1,
  },
  timer: {
    flex: 0.2,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderColor: '#c2efff',
    borderWidth: 1,
    paddingTop: 2

  },
  rivi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3.5,
    paddingBottom: 3.5,
  },
  kortti: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#808791',
    backgroundColor: '#e0f7ff',
    width: 300
  },
  buttonPainettu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#cdd0d4'
  },
  nappi: {
    flex: 0.1,
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
})

export default CarouselCardItem
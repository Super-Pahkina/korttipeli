import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from "react-native"
import { Card, Icon } from 'react-native-elements'


export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
export const SLIDER_HEIGHT = Dimensions.get('window').height + 900
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.9)

const KarusellinKortti = ( {item, index} ) => {
  let elintarvike = ({
    name: `${item.kortti.name_fi}`,
    jokeri: `${item.kortti.jokeri}`,
    pommi: `${item.kortti.pommi}`,
    nutrition: {
      salt: `${item.kortti.salt}`,
      energyKcal: `${item.kortti.energyKcal}`,
      fat: `${item.kortti.fat}`,
      protein: `${item.kortti.protein}`,
      carbohydrate: `${item.kortti.carbohydrate}`, /// ** // ??? // (:
      sugar: `${item.kortti.sugar}`,
      fiber: `${item.kortti.fiber}`,
    }
  })

  const leimat = {
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


  const ValitseIkoni = () => {
    if (elintarvike.jokeri === 'true') {
      return <Icon
        name='diamond'
        type='font-awesome'
      />
    }
    else if (elintarvike.pommi === 'true') {
      return <Icon
        name='snowflake-o'
        type='font-awesome'
      />
    } else {
      return null;
    }
  }


  return (
    <>
    {item.valittu.includes(item.kortti) ? <Card containerStyle={styles.korttiValittu}>
    <Card.Title>{ValitseIkoni()}{elintarvike.name}</Card.Title>
    {ravintoarvot.map((ravintoarvo, index) => (
      <View style={styles.rivi}>
        <Text style={styles.nimi}>{leimat[ravintoarvo]}:  </Text>
        <Text style={styles.ravinto}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
      </View>
    ))} 
  </Card> 
  : 
    <Card containerStyle={styles.kortti}>
    <Card.Title>{ValitseIkoni()}{elintarvike.name}</Card.Title>
    {ravintoarvot.map((ravintoarvo, index) => (
      <View style={styles.rivi}>
        <Text style={styles.nimi}>{leimat[ravintoarvo]}:  </Text>
        <Text style={styles.ravinto}>{Number(elintarvike.nutrition[ravintoarvo]).toFixed(3)}</Text>
      </View>
    ))}
  </Card>}
  </>
  )
  
}

const styles = StyleSheet.create({
  ravinto: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    color: 'brown',
  },
  nimi: {
    fontSize: 15,
    width: 160,
    color: 'brown',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
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
  korttiValittu:{
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#808791',
    backgroundColor: '#c5eba4',
    width: 300
  }
})

export default KarusellinKortti

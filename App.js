import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Kortti from './components/Kortti';
import Ohjeet from './components/Ohjeet';
import Gamerules from './components/Gamerules';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
//import { Button } from '@material-ui/core';

const Stack = createStackNavigator();

function Koti({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tervetuloa ravintoaineiden ihmeelliseen maailmaan!</Text>
      <View style={styles.buttons}>
        <Button
          title="Pelaa"
          onPress={() => navigation.navigate('Gamerules')}
        />
        <Button
          title="Kortti"
          onPress={() => navigation.navigate('Kortti')}
        />
        <Button
          title="Ohjeet"
          onPress={() => navigation.navigate('Ohjeet')}
        />
      </View>
      <Text style={styles.footer}>Datan tarjoaja: Terveyden ja hyvinvoinnin laitos, Fineli</Text>
    </View>
  )
}
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="Gamerules" component={Gamerules} />
        <Stack.Screen name="Kortti" component={Kortti} />
        <Stack.Screen name="Ohjeet" component={Ohjeet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttons: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

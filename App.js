import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import PelaajanVuoro from './components/PelaajanVuoro';
import Ohjeet from './components/Ohjeet';
import Tulossivu from './components/Tulossivu';
import Tulokset from './components/KierroksenTulos';
import Vastus from './components/VastustajanVuoro';
import PelinAsetukset from './components/PelinAsetukset';
import PakanValinta from './components/PakanValinta';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
//import { Button } from '@material-ui/core';

const Stack = createStackNavigator();
const taustakuva = { uri: "https://bit.ly/3dPouZR" };
console.disableYellowBox = true;
function Koti({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={taustakuva} style={styles.taustakuva}>
        <Text style={styles.otsikko}>Elintarvikepeli</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PelinAsetukset')}
          ><Text style={styles.buttonText}>Pelaa</Text></TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Ohjeet')}
          ><Text style={styles.buttonText}>Ohjeet</Text></TouchableOpacity>
        </View>

        <Text style={styles.footer}>Datan tarjoaja: Terveyden ja hyvinvoinnin laitos, Fineli</Text>
      </ImageBackground>
    </View>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Koti" component={Koti} />
        <Stack.Screen name="PelinAsetukset" component={PelinAsetukset} />
        <Stack.Screen name="PelaajanVuoro" component={PelaajanVuoro} />
        <Stack.Screen name="Tulossivu" component={Tulossivu} />
        <Stack.Screen name="KierroksenTulos" component={Tulokset} />
        <Stack.Screen name="VastustajanVuoro" component={Vastus} />
        <Stack.Screen name="Ohjeet" component={Ohjeet} />
        <Stack.Screen name="PakanValinta" component={PakanValinta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#c2efff',
    alignItems: 'center',
    justifyContent: 'center'

  },
  otsikko: {
    fontSize: 45,
    fontWeight: "bold",
    letterSpacing: 1.1,
    textAlign: 'center',
    color: '#7F5CF3',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2,
    marginTop: 10

  },
  footer: {
    justifyContent: 'flex-end',
    letterSpacing: 1.1,
    fontSize: 12,
    padding: 5,
    color: '#7F5CF3',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  buttons: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    padding: 10,
    letterSpacing: 1.1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#c2efff',
    width: 200,
    margin: 20,
    borderColor: 'black',
    borderWidth: 3
  },
  buttonText: {
    letterSpacing: 1.1,
    fontWeight: 'bold',
    fontSize: 18

  },
  taustakuva: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },


});

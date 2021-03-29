import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Kortti from './components/Kortti';
import Ohjeet from './components/Ohjeet';
import Tulossivu from './components/Tulossivu';
import Tulokset from './components/KierroksenTulos';
import Vastus from './components/VastustajanVuoro';
import Gamerules from './components/Gamerules';
import PakanValinta from './components/PakanValinta';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
//import { Button } from '@material-ui/core';

const Stack = createStackNavigator();
console.disableYellowBox = true;
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
    backgroundColor: '#c2efff',
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

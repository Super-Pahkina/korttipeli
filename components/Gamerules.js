import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, Button } from 'react-native';




export default function Gamerules() {
    const [numero, setNumero] = useState(5)

    const PlusNumero = () => {
        setNumero(numero + 1)
    }

    const MinusNumero = () => {
        setNumero(numero - 1)
    }

    const lukitse = () => {
        
    }

    return(
    <View style = {styles.container}>
        <View style = {styles.text}>
            <Text>Voittoon tarvittavat pisteet</Text>
        </View>
        <View style = { styles.valinta}>
            <TouchableOpacity style={styles.button}  onPress={() => MinusNumero()}><Text style = {styles.nappiTeksti}>-</Text></TouchableOpacity>
            <Text style = {styles.nappiTeksti}>{numero}</Text>
            <TouchableOpacity style={styles.button} onPress={() => PlusNumero()}><Text style = {styles.nappiTeksti}>+</Text></TouchableOpacity>
            
            </View> 
        

        <View style={styles.nappi}>
            <TouchableOpacity onPress={() => lukitse()}><Text style = {styles.lukitseButton}>Lukitse valinta</Text></TouchableOpacity>
            
        </View>
    
    </View>
    );
    
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width:'100%',
            
        },
        button: {
            borderStyle:'solid',
            borderColor:'black',
            borderWidth: 1,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom:5,
            paddingTop:5
        },
        nappi: {
            paddingTop: 20,
            flex: 1,
        },
        valinta: {
            flex: 0.1,
            backgroundColor: '#fff',
            alignItems:'center',
            justifyContent: 'center',
            width:'100%',
            flexDirection: 'row'
        },
        text: {
            flex: 1,
            alignItems: 'flex-end',
            paddingBottom: 15,
            justifyContent: 'flex-end'
        },
        nappiTeksti: {
            alignItems:'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingLeft: 20,
            paddingRight: 20
        },
        lukitseButton: {
            borderStyle:'solid',
            borderColor:'black',
            backgroundColor: '#cdd0d4',
            borderWidth: 1,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom:5,
            paddingTop:5
        },
    })
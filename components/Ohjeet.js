import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Ohjeet() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>MONINPELI</Text>
            <Text style={styles.text}>YKSINPELI</Text>
            <Text style={styles.text}>TL:DR</Text>
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
});
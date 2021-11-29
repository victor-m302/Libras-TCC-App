import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'


export default function Empty(){
    return (
        <View style={stylesEmpty.container}>
          <Text style={stylesEmpty.title}>Tradução</Text>
          <View style={stylesEmpty.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text>Não Há Traduções no momento.</Text>
        </View>
      );
    }
    
    const stylesEmpty = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
    });
    
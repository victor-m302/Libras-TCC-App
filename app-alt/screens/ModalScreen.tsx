import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consentimento</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Vídeo de Consentimento em LIBRAS</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/video.png')}
      />
      <View style={styles.lastContainer}>
      <Text style={styles.description}>O objetivo desse vídeo é rapidamente esclarecer (em LIBRAS) o intuito de captura e como funciona o processo de tradução de gestos feito por meio deste aplicativo.</Text>
      <Text style={styles.textpurple}>Leia nossa Política de Privacidade</Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  image: {
    margin: 20,
    width: 340,
    height: 200
  },
  description: {
    margin: 20,
  },
  textpurple: {
    color: "#9900cc"
  },
  lastContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }

});

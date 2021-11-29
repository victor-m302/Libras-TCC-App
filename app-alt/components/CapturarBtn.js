import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, SafeAreaView} from 'react-native';

function CapturarBtn(props) {

  const videoOnPress = props.videoOnPress;
  const imageOnPress = props.onPress;
  const capturaImagem = () => {
    ///console.log('You clicked capturaImagem!');
    //console.log(generico);
    setTimeout(()=> alert('Houve um problema. Verifique a conexão com a internet.'),7000)
    
  };

  const capturaVideo = () => {
    //console.log('You clicked capturaVideo!');
    // do something
  };


  const verificaTipoCaptura = () => {
    if(props.select==1){
      capturaVideo()
      videoOnPress()
    }
    else{
      capturaImagem()
      props.onPress()
    }
  };


  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={verificaTipoCaptura}
        style={styles.official}>
        <Text>{props.something}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CapturarBtn;

/// Just some styles
const styles = StyleSheet.create({
  screen: {
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  official: {
      borderWidth:3,
      margin: 0,
      borderColor:'rgba(151, 0, 255, 1)',
      alignItems:'center',
      justifyContent:'center',
      width:200,
      height:50,
      backgroundColor:'#fff',
      borderRadius:6,
  }
});



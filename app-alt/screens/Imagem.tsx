import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import EditScreenInfo from '../components/EditScreenInfo';
import CapturarBtn from '../components/CapturarBtn';
import EnviarImagem from '../components/Imagem/EnviarImagem';
import CameraTest from '../components/CameraTest';
import { Text, View } from '../components/Themed';

export default function Imagem() {
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShowBtn1, setshouldShowBtn1] = useState(true);
  const [shouldShowBtn2, setshouldShowBtn2] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/*Here we will return the view when state is true 
          and will return false if state is false*/}
          {shouldShow ? (
            <CameraTest teste={() => {
              setShouldShow(!shouldShow)
              setshouldShowBtn1(!shouldShowBtn1);
              setshouldShowBtn2(!shouldShowBtn2)
            }}/>
          ) : null}
      </View>
      </SafeAreaView>
      {shouldShowBtn1 ? (
          <EnviarImagem select={2} whatever={'Imagem'}/>
          ) : null}
      {shouldShowBtn2 ? (
          <CapturarBtn select={2} onPress={() => {
              setshouldShowBtn1(!shouldShowBtn1);
              setShouldShow(!shouldShow);
              setshouldShowBtn2(!shouldShowBtn2)
              }}
              whatever={'Imagem'} something={'Capturar Imagem'} />
          ) : null}

    </View>
  );
}

/*
  <CapturarBtn select={2} onPress={() => setShouldShow(!shouldShow)} 


      {shouldShowX ? (
          <CloseCameraBtn onPress= {() => {
            setShouldShow(!shouldShow)
            setshouldShowBtn1(!shouldShowBtn1)
            setshouldShowBtn2(!shouldShowBtn2)
            setShouldShowX(!shouldShowX)
          } 
        }/>
          ) : null}

*/

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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  camera: {
    flex: 1
  },
  button: {
    width: 50,
    height: 50,
  }
});

import  React, {useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CameraVideo from '../components/CameraVideo';
import EditScreenInfo from '../components/EditScreenInfo';
import CapturarBtn from '../components/CapturarBtn';
import EnviarBtn from '../components/Video/EnviarBtn';
import { Text, View } from '../components/Themed';
import EnviarVideo from '../components/Video/EnviarVideo';


export default function Video() {
  const [shouldShowV, setShouldShowV] = useState(false);
  const [shouldShowBtn1V, setshouldShowBtn1V] = useState(true);
  const [shouldShowBtn2V, setshouldShowBtn2V] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/*Here we will return the view when state is true 
          and will return false if state is false*/}
          {shouldShowV ? (
            <CameraVideo teste={() => {
              setShouldShowV(!shouldShowV)
              setshouldShowBtn1V(!shouldShowBtn1V);
              setshouldShowBtn2V(!shouldShowBtn2V)
            }}/>
          ) : null}
      </View>
      </SafeAreaView>
      {shouldShowBtn1V ? (
          <EnviarVideo select={1} whatever={'Vídeo'}/>
          ) : null}
      {shouldShowBtn2V ? (
          <CapturarBtn select={1} videoOnPress={() => {
              setshouldShowBtn1V(!shouldShowBtn1V);
              setShouldShowV(!shouldShowV);
              setshouldShowBtn2V(!shouldShowBtn2V)
              }}
              whatever={'Vídeo'} something={'Gravar Vídeo'}/>
          ) : null}

    </View>
  );
}

/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
      <Text style={styles.title}>Video</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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

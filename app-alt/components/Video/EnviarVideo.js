import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity,
  Image, SafeAreaView, ActivityIndicator, Touchable } from 'react-native';
  import axios from 'react-native-axios'
  import * as ImagePicker from 'expo-image-picker'
  import { useNavigation, NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { MaterialIcons } from '@expo/vector-icons'; 
  import { useTheme } from '@react-navigation/native';
  import envfile from '../../config/env'
  import timestamp from '../../components/time'
import time from '../../components/time';

export default function EnviarVideo(props) {
    const serverRoute = envfile
    const time = timestamp
    const [storage_vid, setStorage_vid] = useState(null)
    const navigation = useNavigation();
    const [vetor, setVetor] = useState([])
    const color = useTheme()
    const themed_text_color = (color.colors.text)
    const themed_background_color = color.colors.background
    let newVector = []

    /**SOLICITAR PERMISSÃO DO FILE PICKER*/
    useEffect(async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('permissão negada!')
          }
        }
      }, [])

      //continuar com o request, response e mudar de tela
      const videoPost = async (localUri, filename = "vid1", type = "video") => {
        let result = ''
        console.log(100003);
        console.log(localUri);
        let photo = { 
          uri: localUri,
        }
        let formdata = new FormData();
        formdata.append(filename, 'test')
        formdata.append(type, 
        {uri: photo.uri, name: 'vid1.mp4', type: 'video/mp4'})
        console.log(100004);
        // REST API 05
        axios.post(serverRoute+'/videoUpload',
          formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (res){
          console.log('100005 s->'+res.data.message);
          result = res.data.message
          alert(res.data.message)
        })
        .then(function (){
            console.log(100006);
            console.log('result:'+result);
            if (result == null || undefined) {
                alert('null ou undefined')
                return
            }

            newVector = vetor
            newVector.push(result)
            if(vetor.length==0){
                setVetor([result])
                console.log('é isso memo')
            }
            else{
                alert(result)
                //setVetor([...vetor, result])
            }
            console.log('vetor=>'+vetor);
            
            //v.push(data["ibge"])
            //navigation.navigate('Traducao', {dados: data["ibge"]})
            navigation.navigate('Traducao', {dados: vetor, time: time})
        }) 
        .catch(function (res) {
            console.log(res);
        })         
      }//fim env


      //FILE PICKER VIDEO
      const PickVideos = async () => { //PASSO2
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1
        })
        //setStorage_alt(result)
        if (!result.cancelled) {
          console.log(100002);
          //console.log(result.uri);
          videoPost(result.uri)
        }
        else{
          console.log(100004)
          console.log(result);
        }
      }
    
      const connectionTest = async () => {
        const data = await axios.get(serverRoute+'/testGet') //endereço url aqui 
        console.log(data["data"]);
        alert(time)
        return data
      }

    return(
      <View style={styles.screen}>
        <TouchableOpacity style={{backgroundColor: themed_background_color},styles.purpleBorder}
        onPress={ () =>{
            PickVideos()
            //connectionTest()
        }

        }>
            <Text style={{color: themed_text_color}}>Enviar Vídeo</Text>
        </TouchableOpacity>
      </View>
        
    )

}

    //MUDAR DE ABA (TRADUÇÃO)
    function GoToButton() {
        console.log(100006)
        const navigation = useNavigation();
        const [vetor, setVetor] = useState([])

        let novoValor = 'hello'
        ///async await
        console.log('100006');
        setVetor([...vetor, novoValor])
        //v.push(data["ibge"])
        //navigation.navigate('Traducao', {dados: data["ibge"]})
        navigation.navigate('Traducao', { dados: vetor , time: timestamp})
    }


const styles = StyleSheet.create({
  screen: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  official: {
    borderWidth: 3,
    marginTop: 20,
    borderColor: 'rgba(151, 0, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#fff',//fundo do btn
    borderRadius: 6,
  },
  purpleBorder: {
    borderWidth: 3,
    marginTop: 20,
    borderColor: 'rgba(151, 0, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    //backgroundColor: '#fff',
    borderRadius: 6,
  }
});



import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity,
  Image, SafeAreaView, ActivityIndicator, Touchable } from 'react-native';
  import axios from 'react-native-axios'
  import * as ImagePicker from 'expo-image-picker'
  import { useNavigation, NavigationContainer } from '@react-navigation/native';
  import { useTheme } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { MaterialIcons } from '@expo/vector-icons'; 
  import envfile from '../../config/env'

export default function EnviarImagem(props) {
    const serverRoute = envfile
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



      const connectionTest = async () => {
        const data = await axios.get(serverRoute + '/testGet') //endereço url aqui 
        console.log(data["data"]);
        return data
    }


      //continuar com o request, response e mudar de tela
      const imagePost = async (localUri, filename = "img1", type = "image") => {
        let result = ''
        console.log(100003);
        console.log(localUri);
        let photo = { 
          uri: localUri,
        }
        let formdata = new FormData();
        formdata.append(filename, 'test')
        formdata.append(type, 
        {uri: photo.uri, name: filename+'.png', type: 'image/png'})
        console.log(100004);
        // REST API 05
        axios.post(serverRoute+'/imageUpload',
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
            navigation.navigate('Traducao', {dados: vetor})
        }) 
        .catch(function (res) {
            console.log(res);
        })         
      }//fim env


      //FILE PICKER IMAGE

      const PickImage = async () => {//PASSO2
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [16,9],
          quality: 1
        })
    
        if (!result.cancelled) {
            console.log(100002);
            //console.log(result.uri);
            imagePost(result.uri)
        }
    }
    return (
        <View style={styles.screen}>
            <TouchableOpacity style={{backgroundColor:themed_background_color},styles.purpleBorder}
                onPress={() => {
                    PickImage()
                    //connectionTest()
                }}>
                <Text style={{color:themed_text_color}}>Enviar Imagem</Text>
            </TouchableOpacity>
        </View>
    )



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
        backgroundColor: '#fff',
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

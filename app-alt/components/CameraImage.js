import { Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import image1 from '../assets/images/close_black.png'
import image2 from '../assets/images/flip.png'
import axios from 'react-native-axios'
import envfile from '../config/env'
import { useNavigation, NavigationContainer } from '@react-navigation/native';

export default function CameraTest(props) {
    const serverRoute = envfile
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imgUri, setImgUri]=useState(null)
    const navigation = useNavigation();
    const [vetor, setVetor] = useState([])
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log('w:'+windowWidth+', h:'+windowHeight);
    let newVector = []
    let lever = props.teste

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


      //continuar com o request, response e mudar de tela
      const imagePost = async (localUri, filename = "img1", type = "image") => {
        let result = ''
        console.log(100003);
        console.log('localUri:'+localUri);
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
            lever()
            console.log('close');
            navigation.navigate('Traducao', {dados: vetor})
        }) 
        .catch(function (res) {
            alert('Houve um problema. Verifique a conexão com a internet.')
            console.log(res);
        })         
      }//fim env

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{
                width: windowWidth,//samsung // 360,// xiaomi 390, //392
                height: windowHeight*0.80//samsung // 640  // xiaomi 670 //775
            }} type={type} ref={ref => {
                setCameraRef(ref);
            }}>
                <View style={{
                        flex: 1,
                        backgroundColor: 'transparent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ',
                        justifyContent: 'flex-end'
                    }}>


                    <TouchableOpacity //fecha a camera
                    style={{
                        marginHorizontal: windowWidth*0.86, //392w x 775h ideal: 345x520 0.67
                        marginVertical:windowHeight*0.65, //360w x 640h ideal: 310x410 0.64
                        height: 45, 
                        width: 45,
                        justifyContent: 'center', 
                        backgroundColor: '#E43D40',
                        borderRadius: 25,
                        padding: 10,
                        shadowColor: '#303838',
                        shadowOffset: { width: 0, height: 5 },
                        shadowRadius: 10,
                        shadowOpacity: 0.35,
                    }}
                        onPress={() => {
                            console.log('close');
                            lever()
                        }}>
                        <Image source={image1}/>
                    </TouchableOpacity>

                    <TouchableOpacity //inverte//flipa a camera
                        style={styles.flipButton}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Image source={image2}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
                        if (cameraRef) {
                            let photo =  await cameraRef.takePictureAsync()                   
                            console.log('photo',photo);
                            imagePost(photo.uri)
                        }
                    }}>
                        <View style={styles.botaoBorda}>
                            <View style={styles.botaoCirculo}>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchable: {
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    text1: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    botaoBorda: {
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'white',
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoCirculo: {
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 40,
        backgroundColor: 'white'
    },
    closeButton: {
        height: 45, 
        width: 45,
        justifyContent: 'center', 
        backgroundColor: '#E43D40',
        borderRadius: 20,
        padding: 10,
        marginLeft:300, 
        marginBottom: 400,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
      flipButton: {
        height: 45,
        width: 45,
        justifyContent: 'center', 
        position:'relative',
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        padding: 10,
        marginLeft:30, 
        marginBottom: -45,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      },
})
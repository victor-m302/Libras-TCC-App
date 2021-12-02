import { Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import image1 from '../assets/images/close_black.png'
import image2 from '../assets/images/flip.png'
import { FontAwesome } from '@expo/vector-icons'; 
import axios from 'react-native-axios'
import envfile from '../config/env'

export default function CameraVideo(props) {
    const serverRoute = envfile
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [gravar, setGravar] = useState(false)
    const navigation = useNavigation();
    const [vetor, setVetor] = useState([])
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log('w:'+windowWidth+', h:'+windowHeight);
    let newVector = []

    let lever = props.teste

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
            lever()
            //v.push(data["ibge"])
            //navigation.navigate('Traducao', {dados: data["ibge"]})
            navigation.navigate('Traducao', {dados: vetor})
        }) 
        .catch(function (res) {
            console.log(res);
        })         
      }//fim env

    const record = async (camera) => {
        //console.log("record", camera); 
        if(camera){
            let recording = await camera.recordAsync();
            console.log('video uri: '+ recording.uri);
            videoPost(recording.uri)
        }
    }

    const stopRecording = async (camera) => {
        console.log("stop recording", camera); 
        if(camera){
            let stopRecording = await camera.stopRecording(); 
            console.log('stopRecording:'+stopRecording);
        }
    }


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestMicrophonePermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
                        backgroundColor: 'transparent',
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

                    {gravar ? (  
                        <TouchableOpacity onPress={
                        /* quando gravar = true */
                        async () => {
                            if (cameraRef) {
                                //let video = await cameraRef.recordAsync();
                                //console.log('video', video);
                                stopRecording(cameraRef)
                                setGravar(false)
                                //setTimeout(()=> alert('Erro: Verifique sua conexão ou se o dispositivo de gravação está funcionando corretamente.'),
                                //5000)
                                
                            }
                        }
                        }>
                        <View style={styles.botaoParar}><FontAwesome name="stop" size={24} color="black" /></View>
                       </TouchableOpacity> 
                     ) : ( 
                     <TouchableOpacity style={{ alignSelf: 'center' }} 
                        onPress={async () => { /* quando gravar = false */
                            if (cameraRef) {
                                //let video = await cameraRef.recordAsync();
                                //console.log('video', video);
                                record(cameraRef)
                                setGravar(true)
                            }
                        }}>
                        <View style={styles.botaoBorda}>
                            <View style={styles.botaoCirculo}>
                            </View>
                        </View>
                    </TouchableOpacity> 
                     )}

            
                

                    
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    cameraStyle: {
        width: 350,
        height: 500
    },
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
        borderColor: 'red',
        height: 40,
        width: 40,
        backgroundColor: 'red'
    },
      botaoParar: {
        height: 45, 
        width: 45,
        justifyContent: 'center', 
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 13,
        marginLeft:300, 
        marginBottom: 10,
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
import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import image1 from '../assets/images/close_black.png'
import image2 from '../assets/images/flip.png'

export default function CameraTest(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    let lever = props.teste

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
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
            <Camera style={styles.cameraStyle} type={type} ref={ref => {
                setCameraRef(ref);
            }}>
                <View style={{
                        flex: 1,
                        backgroundColor: 'transparent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ',
                        justifyContent: 'flex-end'
                    }}>


                    <TouchableOpacity //fecha a camera
                        style={styles.closeButton}
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
                            let photo = await cameraRef.takePictureAsync();
                            console.log('photo', photo);
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
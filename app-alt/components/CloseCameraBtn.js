import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import image1 from '../assets/images/close_black.png'

function IconBtn(props){

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
const generico = props.onPress;
return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>{ props.onPress()}}>
        <Image source={image1}/>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
    container: {
        marginBottom: -140
        
    },
    button: {
      backgroundColor: '#E43D40',
      borderRadius: 20,
      padding: 10,
      marginBottom: 100,
      marginLeft: 300,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
    },
  });

export default IconBtn;
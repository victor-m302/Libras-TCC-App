import * as React from 'react';
import { StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed'
import { useState, useEffect } from 'react'
import EditScreenInfo from '../components/EditScreenInfo';
import Empty from '../components/Traducao/Empty';
import General from '../components/Traducao/General'
import { RootTabScreenProps } from '../types';
import { resolveUri } from 'expo-asset/build/AssetSources';
import { tsExternalModuleReference } from '@babel/types';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

export default function TabOneScreen({ navigation, route  }: RootTabScreenProps<'Traducao'>) {
  let data: string[] = [];
  const { colors } = useTheme();
  useEffect( ()=>{
    teste()
  }
    ,[])

  const isFocused = useIsFocused();
      // The screen is focused
      // Call any action
      //console.log(1000022);
      
      if(route.params != undefined){
        console.log('100007');
        let temp = route.params
        data = temp["dados"]
        console.log("data:"+data)
        console.log(100008);
      }

      
 
  const teste = ()=>{
    let v = ''
    for (let i = 0; i < data.length; i++) {
      v+=data[i]+','
    }
    return ''
    return v
  }

  /*
  let temp1 = []
  if(data){
    console.log("show:"+data["dados"])
    //data["dados"]
    //setWhatever([...whatever,data["dados"]])
    temp1.push(data["dados"])
    console.log(temp1);
  }

<Empty/>        <Text> { teste()} </Text>
  */
  return ( //param={data}
    <View style={styles.container}>

        {isFocused ? <General apple={data}/>: <Text> {//console.log('unfocused')
        }</Text> }
    </View>
  );      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ///alignItems: 'center',
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
});

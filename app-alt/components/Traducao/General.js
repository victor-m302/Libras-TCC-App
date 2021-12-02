import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView} from "react-native";
//import { Text,View } from 'react-native';
import { Text, View } from '../../components/Themed'
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Empty from './Empty';


export default General = (props) => {
    //console.log('props.apple:' + props.apple);
    const [tasks, setTasks] = useState(props.apple); //props.apple
    const [task, setTask] = useState();
    const color = useTheme()
    const themed_text_color = (color.colors.text)
    const themed_background_color = color.colors.background
    //console.log(color);

    const addTask = (task) => {
        if (task == null) {
            return
        }
        setTasks([...tasks, task]);
    }

    const deleteTask = (deleteIndex) => {
        setTasks(tasks.filter((value, index) => index != deleteIndex));
    }

    
    const handleAddTask = (value) => {
        addTask(value);
        setTask(null);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {
                    tasks.length == 0 ? <Empty/> : tasks.map((task, index) => {
                        return (
                            <View key={index} style={styles.taskContainer1}>
                                <View index={index + 1} style={styles.container3}>
                                    <View style={{themed_background_color},styles.itensContainer}>
                                        <Text style={{themed_text_color},styles.task}>{task}</Text>
                                        <TouchableOpacity onPress={() => deleteTask(index)}>
                                            <MaterialIcons style={styles.delete} name="delete" size={18} color='#61009e' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
           
            <View>

        </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: useTheme.backgroundColor//'#fff',
    },
    heading: {
        //color: '#000',//'#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 20,
    },
    scrollView: {
        marginBottom: 70,
    },
    taskContainer1: {
        marginTop: 20,
    },
    container2: {//inputfield
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container3: { //taskitem
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    itensContainer: {
        //backgroundColor: '#fff', //backg of item
        borderColor: '#8803fc',
        borderWidth: 3,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: { //text color of item
        //color: '#000',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
});
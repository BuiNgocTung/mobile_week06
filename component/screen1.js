import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Button } from 'react-native';

export default function screen1({ navigation }) {
    var [data, setData] = useState([])

    useEffect(() => {
        fetch('https://6530cf906c756603295f14b9.mockapi.io/dad')
            .then(response => response.json())
            .then(json =>
                // console.log(json)
                setData(json));
    }, [])

    const textColors = ['green', 'red', 'red'];
    const widthIcon = [19, 24, 24];
    const heightIcon = [14, 24, 24];

    return (
        <View style={styles.container}>
        <Text style={{fontSize:24,fontWeight:'700'}}>Welcome to Cafe world</Text>

            {

                data.map((item, index) => {
                    return (
                        <View style={{margin:10}}>
                     
                        <Image source={item.image} style={styles.image} />
                       
                        </View>
                    )
                })
            }

            <TouchableOpacity style={{
                backgroundColor: '#00BDD6', borderRadius: 6, alignItems: 'center', justifyContent: 'center', width: 347
                , padding: 9, marginTop: 50
                     }} onPress={()=> {navigation.navigate('Screen2', {data}) }  } >
                <Text style={{ fontSize: 16, color: 'white', }}>GET STARTED</Text>

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin:50

    },
    image: {
        width: 347,
        height: 114
    },
    iconTime: {
        width: 18,
        height: 18
    },
    iconAddress: {
        width: 14,
        height: 18
    }
});

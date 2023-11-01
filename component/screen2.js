import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Button } from 'react-native';

export default function screen1({ navigation,route }) {
    var [data, setData] = useState([])


    // useEffect(() => {
    //     setData(route.params?.data);
      
    // }, [route.params?.data]);
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
                <View style={{flexDirection:'row',margin:20,justifyContent:'space-between'}}>

                <TouchableOpacity style={{flexDirection:'row',}} onPress={ ()=>  {navigation.navigate('Screen1')}}>
                <Image source={require("../assets/Frame2.png")} style={{width:20,height:20}}/>
                <Text style={{fontSize:24,fontWeight:'700',marginLeft:30,marginTop:-8}}>Shops Near Me</Text>
                </TouchableOpacity>

                <Image source={require("../assets/Image 177.png")} style={{width:20,height:20}}/>

             
                  
                </View>
            {

                data.map((item, index) => {
                    return (
                        <View style={{alignItems:'center'}}>
                        <View key={index} style={{ with: 347, height: 250 }}>
                        <TouchableOpacity onPress={ ()=>  {navigation.navigate('Screen3')}}>
                        <Image source={item.image} style={styles.image} />
                        </TouchableOpacity>
                          
                            <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between',marginHorizontal:5 }}>

                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.iconStatus} style={{ width: widthIcon[index], height: heightIcon[index] }} />

                                    <Text style={{ color: textColors[index], fontSize: 14, marginLeft: 10 }}>{item.status}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.iconTime} style={styles.iconTime} />
                                    <Text style={{ color: 'red', fontSize: 14, marginLeft: 10 }}>{item.deliverytime}</Text>
                                </View>

                                <Image source={item.iconAddress} style={styles.iconAddress} />

                            </View>
                            
                            <Text style={{fontWeight:'bold', fontSize: 16,marginLeft:10}}>{item.name}</Text>
                            <Text style={{color:'gray', fontSize: 14,marginLeft:10}}>{item.address}</Text>

                        </View>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
     
        marginTop:20


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

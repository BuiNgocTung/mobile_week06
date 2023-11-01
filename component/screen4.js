import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Screen4({ navigation, route }) {
    const [data, setData] = useState([]);
    const [itemCounts, setItemCounts] = useState([]);
    useEffect(() => {
        setData(route.params?.data);
        setItemCounts(route.params?.itemCounts);
    }, [route.params?.data, route.params?.itemCounts]);



    const handleIncrement = (index) => {
        const updatedCounts = [...itemCounts];
        updatedCounts[index] += 1;
        setItemCounts(updatedCounts);
    };

    const handleDecrement = (index) => {
        if (itemCounts[index] > 0) {
            const updatedCounts = [...itemCounts];
            updatedCounts[index] -= 1;
            setItemCounts(updatedCounts);
        };
    };
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (data.length > 0 && itemCounts.length === data.length) {
            const newTotalPrice = data.reduce((acc, item, index) => {
                return acc + itemCounts[index] * item.price;
            }, 0);
            setTotalPrice(newTotalPrice);
        }
    }, [itemCounts, data]);
    return (



        <View style={styles.container}>

            <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'space-between' }}>

                <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => { navigation.navigate('Screen3') }}>
                    <Image source={require("../assets/Frame2.png")} style={{ width: 20, height: 20 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', marginLeft: 30, marginTop: -8 }}>Your orders</Text>
                </TouchableOpacity>

                <Image source={require("../assets/Image 177.png")} style={{ width: 20, height: 20 }} />

            </View>


           <View style={{alignItems:'center'}}>

           <View style={styles.header}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white', margin: 10 }}>CAFE DELIVERY</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white', margin: 10 }}>Order #18</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>$5</Text>

            </View>

            <View style={styles.header2}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white', margin: 10 }}>CAFE </Text>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white', margin: 10 }}>Order #18</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}>${totalPrice}</Text>

           </View>

            </View>



            {data.map((item, index) => {
                return (
                    <View style={{alignItems:'center'}}>
                    <View
                        key={item.id}
                        style={{
                            width: 350,
                            height: 64,
                            borderWidth: 1,
                            margin: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}  >

                        <Image source={item.image} style={styles.image} />


                        <View style={{ marginLeft: 20, justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/Frame1.png')}
                                    style={{ width: 12, height: 12 }} />
                                <Text style={{ fontSize: 12, fontWeight: '500', color: 'gray' }}>${item.price} </Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDecrement(index)}  >

                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>

                            <Text>{itemCounts[index]}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleIncrement(index)}  >
                                <Text style={styles.buttonText}>+</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                );
            })}
            <View style={{alignItems:'center'}}>


            <TouchableOpacity style={{
                backgroundColor: '#EFB034', borderRadius: 6, alignItems: 'center', justifyContent: 'center', width: 347
                , padding: 9, marginTop: 100
            }}
                onPress={() => { navigation.navigate('Screen3', { 'data': data, "itemCounts": itemCounts }) }}>
                <Text style={{ fontSize: 16, color: 'white', }}>PAY NOW</Text>

            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
    },
    buttonContainer: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -4,
    },
    header: {
        width: 347,
        height: 100,
        backgroundColor: '#00BDD6',
        borderRadius: 6,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
        , margin: 10
    },
    header2: {
        width: 347,
        height: 100,
        backgroundColor: '#8353E2',
        borderRadius: 6,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center', 
        margin: 10
    }
});

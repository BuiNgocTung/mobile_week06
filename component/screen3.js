import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Screen3({ navigation }) {
    const [data, setData] = useState([]);
    const [itemCounts, setItemCounts] = useState([]);

    useEffect(() => {
        fetch('https://6530cf906c756603295f14b9.mockapi.io/drink')
            .then((response) => response.json())
            .then((json) => {
                setData(json);

                setItemCounts(Array(json.length).fill(0));
            });
    }, []);

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
        }
    };
    const navigateToCart = () => {
        const filteredData = data.filter((item, index) => itemCounts[index] > 0);
        const filteredItemCounts = itemCounts.filter((item, index) => itemCounts[index] > 0);

        navigation.navigate('Screen4', { "data": filteredData, "itemCounts": filteredItemCounts });
    };

    //
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

                <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => { navigation.navigate('Screen2') }}>
                    <Image source={require("../assets/Frame2.png")} style={{ width: 20, height: 20 }} />
                    <Text style={{ fontSize: 24, fontWeight: '700', marginLeft: 30, marginTop: -8 }}>Drink</Text>
                </TouchableOpacity>

                <Image source={require("../assets/Image 177.png")} style={{ width: 20, height: 20 }} />



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
                            margin: 10,
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
                , padding: 9, marginTop: 50
            }}
                onPress={navigateToCart}>
                <Text style={{ fontSize: 16, color: 'white', }}>GO TO CART</Text>

            </TouchableOpacity>

            </View>

       
        </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
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
});

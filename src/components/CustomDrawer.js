import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


const CustomDrawer = props => {

    const navigation = useNavigation();

    const handleWalletNavigation = () => {
        navigation.navigate('Wallet'); // Navigate to the Wallet screen
    };

    const handleAddMoneyNavigation = () => {
        navigation.navigate('AddMoney');
    };


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8C1018' }}>
                <ImageBackground
                    backgroundColor='#8C1018'
                    style={{ padding: 20 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/profile_icon.png')}
                            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                        />
                        <View style={{ marginLeft: 12 }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'Poppins-Regular',
                                    marginBottom: 5,
                                    fontWeight: '700'
                                }}>
                                John Doe
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#fff',
                                    fontFamily: 'Poppins-Regular',
                                    marginRight: 5,
                                }}>
                                Balance : ₹ 108
                            </Text>
                        </View>
                    </View>

                </ImageBackground>

                {/* add button here */}
                <View style={{ paddingHorizontal: 18 , marginBottom:18}}>
                    <TouchableOpacity style={{ zIndex: 1 }} onPress={handleWalletNavigation}>
                        <View style={styles.balanceButton}>
                            <Image
                                source={require('../assets/wallet_icon.png')}
                                style={{ width: 22, height: 22, tintColor: 'black', resizeMode: 'contain' }} // tintColor applies the color to the image
                            />
                            <Text style={styles.balanceButtonText}>My Balance</Text>
                            <Text style={styles.balanceButtonText2}>₹ 108</Text>

                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ marginTop: 0, zIndex: 0 }} onPress={handleAddMoneyNavigation}>
                        <View style={styles.addMoneyButton}>

                            <Text style={styles.addMoneyText}>Add Money</Text>

                        </View>
                    </TouchableOpacity>
                </View>



                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>



        </View>
    );
};

const styles = StyleSheet.create({

    balanceButton: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center', // Center the items vertically
    },
    balanceButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
        flex: 1, // Allow text to take available space
    },
    balanceButtonText2: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular',
    },
    addMoneyButton: {
        alignSelf: 'center',
        width: '96%',
        backgroundColor: '#f0ffe2',
        padding: 10,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center', // Center the items vertically
    },
    addMoneyText: {
        color: '#164928',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center'
    },
});

export default CustomDrawer;
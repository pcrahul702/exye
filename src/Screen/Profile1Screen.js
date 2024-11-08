
import React from 'react';
import { StatusBar, StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';



const Profile1Screen = () => {

    const navigation = useNavigation();

    const handleUploadPanCard = () => {
        navigation.navigate('UploadPan'); // Navigate to the Wallet screen
    };

    const handleUploadBankDetails = () => {
        navigation.navigate('UploadBank'); // Navigate to the Wallet screen
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.bg}>
                <Image
                    source={require('../assets/Group.png')}
                    style={styles.backgroundImage}
                />
                <StatusBar hidden={true} />

                <View>
                    <Image
                        source={require('../assets/upCircle.png')}
                        resizeMode="contain"
                        style={styles.topImage}
                    />

                    <LinearGradient
                        colors={['#FFFFFF', '#FE7503']}
                        style={styles.gradientBorder}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>MY PROFILE</Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.icon}>
                        <Image
                            source={require('../assets/profile_avatar.png')}
                            style={styles.iconImage}
                        />
                    </View>




                </View>

                <Text style={styles.text1}>name : xxxxxxxxxxxx</Text>
                <Text style={styles.text1}>address : xxxxxxxxxxxx</Text>
                <Text style={styles.text1}>Mobile No. : xxxxxxxxxx</Text>


                <View style={styles.myView}>
                    <TouchableOpacity style={styles.button} onPress={handleUploadPanCard}>
                        <Text style={styles.buttonText}>pan card</Text>
                        <Image
                            source={require('../assets/panCard.png')}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#878787' }]} onPress={handleUploadBankDetails}>
                        <Text style={styles.buttonText}>bank details</Text>
                        <Image
                            source={require('../assets/bankDetails.png')}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Image
                source={require('../assets/bottomSpiral.png')}
                resizeMode="contain"
                style={styles.image}
            />


            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    scrollContainer:{
        alignSelf:'center',
        width:'100%',
        height:'100%',
    },
    topImage: {
        position: 'absolute',
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    icon: {
        width: 105,
        height: 105,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderColor: '#ffa952',
        borderWidth: 10,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 35
    },
    iconImage: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        borderColor: '#EF5A5A',
        borderWidth: 4

    },
    gradientBorder: {
        padding: 3, // Border width
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 52
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#EF5A5A',
        borderRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    headerText: {
        width: 'auto',
        fontSize: 27,
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular'
    },
    text1: {
        fontSize: 30,
        fontWeight: '400',
        color: '#ffa952',
        alignSelf: 'center',
        marginTop: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        fontFamily: 'Poppins-Regular'
    },
    image: {
        marginTop:100,
        width: '100%',
        resizeMode: 'stretch',
        bottom:0
    },
    myView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        marginHorizontal: 20
    },
    button: {
        width: 150,
        height: 90,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EF5A5A',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '275',
        color: '#ffffff',
        marginTop: 5,
        fontFamily: 'Poppins-Regular'
    },
    buttonIcon: {
        width: 55,
        height: 55,
    },


}
)


export default Profile1Screen;
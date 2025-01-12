import React from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function WithdrawalStatusScreen() {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image source={require('../assets/cl1.png')} style={styles.uppershape} />

            {/* Content Section */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Step 1 */}
                <View style={styles.stepContainer}>
                    <Image
                        source={require('../assets/req_rec_logo.png')} // Replace with actual icon path
                        style={styles.stepIcon}
                    />
                    <Text style={styles.stepText}>Withdrawal request received on 15th December 2024</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Image
                        source={require('../assets/solid_arrow.png')} // Replace with actual arrow image path
                        style={styles.arrowIconVertical}
                    />
                </View>

                {/* Step 2 */}
                <View style={styles.stepContainer}>
                    <Image
                        source={require('../assets/req_ver_logo.png')} // Replace with actual icon path
                        style={styles.stepIcon}
                    />
                    <Text style={styles.stepText}>Backend verification completed on 17 December 2024</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Image
                        source={require('../assets/broken_arrow.png')} // Replace with actual arrow image path
                        style={styles.arrowIconVertical}
                    />
                </View>

                {/* Step 3 */}
                <View style={styles.stepContainer}>
                    <Image
                        source={require('../assets/req_cred_logo.png')} // Replace with actual icon path
                        style={styles.stepIcon}
                    />
                    <Text style={styles.stepText}>Will be credited to your Linked Bank Account by 19th December</Text>
                </View>
            </ScrollView>


            <Image
                source={require('../assets/bcl1.png')}
                resizeMode="contain"
                style={styles.bottomNav} />

            <View style={styles.bottomContainer}>
                <Image
                    source={require('../assets/leftArrowWhite.png')}
                    style={styles.arrowIcon}
                />
                <Text style={styles.bottomText}>Swipe to go back</Text>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',  // Make sure children are spaced between the top and bottom
    },
    uppershape: {
        position: 'absolute',
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop:16,
        paddingTop: 20,
        marginHorizontal:20,
    },
    stepContainer: {
        flexDirection: 'row', // Horizontal layout
        alignItems: 'center',
        marginBottom: 8,
    },
    stepIcon: {
        width: 100,
        height: 100,
        marginRight: 10, // Space between icon and text
    },
    stepText: {
        fontSize: 18,
        color: '#333333',
        fontFamily: 'Poppins-Regular',
        flex: 1,
        fontFamily: 'Poppins-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 0, height: 2 }, 
        textShadowRadius: 4,
    },
    arrowContainer: {
        alignSelf:'flex-start',
        left:35,
        marginBottom: 20,
    },
    arrowIconVertical: {
        width: 30,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    bottomContainer: {
        position: 'absolute',  // Position it absolutely at the bottom
        bottom: 10,  // Adjust the distance from the bottom
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',  // Center the text and icon horizontally
        alignItems: 'center',
        paddingHorizontal: 20,  // Optional: to provide some space from left and right
    },
    arrowIcon: {
        width: 36,
        height: 36,
        marginRight: 10,
    },
    bottomText: {
        fontSize: 31,
        fontWeight: '275',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
});



export default WithdrawalStatusScreen;

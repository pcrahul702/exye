import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getData, postData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const { width, height } = Dimensions.get('window');

const LiveDetailsScreen = () => {

    const navigation = useNavigation();

    const [contestData, setContestData] = useState([]);

    const route = useRoute();
    const { contestId } = route.params;

    useEffect(() => {
        if (contestId) {
            getContestData(contestId);
        }
    }, [contestId]);

    const getContestData = async (id) => {
        try {
            const res = await getData(`/api/v1/dashboard/${id}`);

            setContestData(res);
            console.log(res);

        } catch (error) {
            console.log('error', error);
            Alert.alert(error?.response?.data?.message);
        }
    };

    const handleTopicNavigation = () => {
        navigation.navigate('Topic');
    };

    const handleLiveNavigation = () => {
        navigation.navigate('Live');
    };

    const handleJoinContest = async () => {

        const token = await getAccessToken();
        console.log(token);

        try {
            const data = await postData(`/api/v1/quiz/${contestData.topicId}/contest/${contestData.contestId}/join`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(data);
            Alert.alert("You have joined the contest successfully!");

            navigation.navigate('QuizChoice', { contestId: contestData.contestId, topicId: contestData.topicId });

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert(errorMessage); // Display error message from response
            } else {
                // If there's no response, show a generic error
                Alert.alert('An unexpected error occurred');
            }
            console.error('Error during joining contest:', error);
            navigation.navigate('QuizChoice', { contestId: contestData.contestId, topicId: contestData.topicId });
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />
            <Image source={uppershaper} style={styles.uppershape} />
            <Image source={upperLog} style={[styles.upperLog, { height: width * 0.5 }]} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../assets/detailsBG.png')} style={[styles.topImage, { height: width * 0.5 }]} />
                <View style={styles.ViewContainer}>
                    <Text style={styles.text1}>You are going to join :</Text>

                    <View style={styles.textBox}>
                        <Text style={styles.keyText}>Contest :</Text>
                        <View style={styles.valueBox}>
                            <Text style={styles.valueText}>1</Text>
                        </View>
                    </View>

                    <View style={styles.textBox2}>
                        <Text style={styles.keyText}>For Rupees : </Text>
                        <View style={styles.valueBox}>
                            <Text style={styles.valueText}>₹ {contestData.entryAmount}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={handleJoinContest} style={styles.yesButton}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLiveNavigation} style={styles.noButton}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default LiveDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0', // Optional: For better visualization of the layout
    },
    uppershape: {
        width: '100%',
        resizeMode: 'stretch',
        top: 0,
    },
    upperLog: {
        alignSelf: 'center',
        top: -100,
        width: '50%',
        resizeMode: 'stretch',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'cover',
    },
    scrollContainer: {
        bottom: 0
    },
    topImage: {
        alignSelf: 'center',
        width: '50%',
        resizeMode: 'contain',
    },
    ViewContainer: {
        alignSelf: 'center',
        width: '92%',
        height: 'auto',
        backgroundColor: '#FFA952',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 20,// Margin at the bottom of the ViewContainer
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 20, height: 8 }, // Shadow offset
        shadowOpacity: 0.8, // Shadow opacity
        shadowRadius: 8, // Shadow spread radius
        elevation: 10, // Android shadow (approximation)
    },
    text1: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'center',
        margin: 30,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
    textBox: {
        width: '80%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#F05A5B',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center', // Center vertically
        paddingLeft: 20,
    },
    textBox2: {
        marginTop: 15,
        width: '80%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#F05A5B',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center', // Center vertically
        paddingLeft: 20,
    },
    keyText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
        flex: 1,
        fontFamily: 'Poppins-Regular'
    },
    valueBox: {
        width: 'auto',
        height: 40,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginRight: 25
    },
    valueText: {
        color: '#F05A5B',
        fontSize: 18,
        padding: 4,
        fontWeight: '500',
        fontFamily: 'Poppins-Regular'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 24
    },
    yesButton: {
        width: '42%',
        height: 'auto',
        backgroundColor: '#3DC467',
        justifyContent: 'center', // Center vertically
        borderRadius: 70,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 2, height: 5 }, // Shadow offset
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 5, // Android shadow (approximation)
    },
    noButton: {
        width: '42%',
        height: 'auto',
        backgroundColor: '#EF5A5A',
        justifyContent: 'center', // Center vertically
        borderRadius: 70,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 2, height: 5 }, // Shadow offset
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 5, // Android shadow (approximation)
    },
    buttonText: {
        alignSelf: 'center',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 32,
        verticalAlign: 'middle',
        fontFamily: 'Poppins-Regular',
        shadowColor: 'black', // Shadow color
        shadowOffset: { width: 2, height: 5 }, // Shadow offset
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 5,
    },
});
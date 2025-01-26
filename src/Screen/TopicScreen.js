import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAccessToken } from '../Utils/getAccessToken';
import axios from 'axios';
import { getData } from '../Utils/api';

const TopicScreen = () => {

    const [selectedCard, setSelectedCard] = useState(null);
    const [isReadyButtonDisabled, setIsReadyButtonDisabled] = useState(true);
    const [data, setData] = useState([]); // State to hold the filtered topics
    const navigation = useNavigation();

    useEffect(() => {
        // Make the API call when the screen loads
        const fetchData = async () => {
            try {

                const token = await getAccessToken();
                console.log(token);

                const response = await getData('/api/v1/dashboard/all-active-topics', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Example of an Authorization header
                        'Content-Type': 'application/json',         // Specify content type
                    },
                });
                console.log('API Data:', response.data);
                //add data from api to data const

                const filteredData = response.data.map(topic => ({
                    id: topic.id,
                    text: topic.topicName,
                    description: topic.topicDescription,
                    image: { uri: `${topic.preSignedTopicUrl}` },
                }));

                // Update state with the filtered data
                setData(filteredData);

            } catch (error) {
                if (error.response) {
                    console.error('Error Response:', error.response);
                } else if (error.request) {
                    console.error('Error Request:', error.request);
                } else {
                    console.error('Error Message:', error.message);
                }
            }
        };

        fetchData(); // Call the API when the component mounts




    }, []);

    const handleReady = () => {
        navigation.navigate('CustomContest');
    };

    const toggleCardSelection = (id) => {
        setSelectedCard(selectedCard === id ? null : id);
        setIsReadyButtonDisabled(selectedCard === id ? true : false);
        console.log("ss" + selectedCard);

    };


    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const rows = chunkArray(data, 2);

    return (
        <View style={styles.bg}>
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <StatusBar hidden={true} />

            <Image source={require('../assets/uppershape.png')} resizeMode="contain" style={styles.topImage} />

            <Text style={styles.header}>Scroll down to select topic</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.card, selectedCard === item.id && styles.selectedCard]}
                                onPress={() => toggleCardSelection(item.id)}
                            >
                                <Image source={item.image} style={styles.cardImage} />
                                <Text style={styles.cardText}>{item.text}</Text>
                                <Text style={styles.cardDescription}>
                                    {item.description.length > 100
                                        ? item.description.slice(0, item.description.lastIndexOf(' ', 100)) + ' ...'
                                        : item.description}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                {/* <Text style={styles.bottomText}>Swipe to go Back</Text> */}
            </ScrollView>

            <TouchableOpacity style={[
                styles.readyButton,
                {
                    backgroundColor: isReadyButtonDisabled
                        ? 'rgba(61, 196, 103, 0.6)'
                        : 'green',
                },
            ]}
                onPress={handleReady}
                disabled={isReadyButtonDisabled}>
                <Text style={styles.readyText}>Ready!</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#ffa952'
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
        opacity: 0.8
    },
    topImage: {
        top: 0,
        width: '100%',
        resizeMode: 'stretch',
    },
    header: {
        alignSelf: 'center',
        color: 'green',
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Poppins-Regular'
    },
    scrollContainer: {
        width: '100%',
        paddingTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    card: {
        width: '40%',
        height: 340,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: 'center',
        padding: 10,
        borderRadius: 18,
    },
    selectedCard: {
        backgroundColor: 'rgba(67, 163, 99, 1)',
    },
    cardImage: {
        width: 130,
        height: 140,
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#EF5A5A',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
    },
    cardDescription: {
        marginTop: 5,
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Poppins-Regular',
    },
    readyButton: {
        width: 250,
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 40,
        margin: 20,
        borderColor: 'white',
        borderWidth: 5,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    readyText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
    bottomText: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        color: 'white',
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular'
    },
    view1: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#F05A5B',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text1: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        padding: 10,
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular',
    },
});

export default TopicScreen;
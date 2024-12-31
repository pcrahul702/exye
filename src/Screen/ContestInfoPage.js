import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import { getData, postData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const { width, height } = Dimensions.get('window');

const ContestInfoPage = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { contestId } = route.params;

    const [contestData, setContestData] = useState([]);
    const [topicId, setTopicId] = useState("");
    const [topicName, setTopicName] = useState("");

    useEffect(() => {
        if (contestId) {
            getContestData(contestId);
        }
    }, [contestId]);

    useEffect(() => {

        if (contestData && contestData.topicId) {
            getTopicName(contestData.topicId);
        }
    }, [contestData]);

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

    const formatTime = (isoTime) => {
        const date = new Date(isoTime);
        return date.toLocaleString();
    };

    const getTopicName = async (id) => {
        try {
            const res = await getData(`/api/v1/profile/topic/${id}`);
            setTopicName(res.data.topicName);
            setTopicId(res.data.topicId); 
        } catch (error) {
            console.log('error', error);
            Alert.alert(error?.response?.data?.message);
        }
    };

    const handleJoinContest = async () => {

        const token = await getAccessToken();
        console.log(token);

        try {
            const data = await postData(`/api/v1/quiz/${topicId}/contest/${contestId}/join`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(data);
            Alert.alert("You have joined the contest successfully!");

            navigation.goBack();
        } catch (error) {      
            if (error.response) {
                const errorMessage = error.response.data.message || 'An error occurred';
                Alert.alert(errorMessage); // Display error message from response
            } else {
                // If there's no response, show a generic error
                Alert.alert('An unexpected error occurred');
            }
            console.error('Error during joining contest:', error);
            
            
        }
    };

    return (
        <View style={styles.bg}>

            <Image
                source={require('../assets/Group.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <StatusBar hidden={true} />

            <ScrollView>
                {contestData && (
                    <>
                        {/* Contest Name as Heading */}
                        <Text style={styles.heading}>{contestData.contestName}</Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Topic:</Text>
                            <Text style={styles.detailText}>
                                {topicName || 'Loading...'} {/* Display the topic name from state */}
                            </Text>

                            <Text style={styles.label}>Contest Time:</Text>
                            <Text style={styles.detailText}>{formatTime(contestData.whenToStart)}</Text>

                            <Text style={styles.label}>Entry Fees:</Text>
                            <Text style={styles.detailText}> ₹ {contestData.entryAmount}</Text>

                            <Text style={styles.label}>Reward per Contestant:</Text>
                            <Text style={styles.detailText}> ₹ {contestData.prizePerContestant} </Text>

                            <Text style={styles.label}>Players Joined:</Text>
                            <Text style={styles.detailText}>{contestData.playerJoined||0}</Text>
                        </View>
                    </>
                )}

                <TouchableOpacity style={styles.joinButton}
                    onPress={handleJoinContest}>
                    <Text style={styles.joinText}>Join Contest</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#e9e9e9',
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
    },
    heading: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
    },
    infoContainer: {
        marginVertical: 30,
        backgroundColor: '#ffa952',
        opacity: 1,
        borderRadius: 10,
        padding: 12,
        marginHorizontal: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    label: {
        marginTop: 8,
        fontSize: width * 0.04,
        fontWeight: '700',
        color: '#000000',
        marginTop: 6,
        marginLeft: 6,
        fontFamily: 'Poppins-Regular',
    },
    detailText: {
        fontSize: width * 0.05,
        color: '#000000',
        fontWeight: '700',
        marginBottom: 5,
        marginLeft: 6,
        fontFamily: 'Poppins-Regular',
    },
    joinButton: {
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        borderRadius: 40,
        padding: 14,
        marginBottom: 15,
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
    joinText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
});

export default ContestInfoPage;
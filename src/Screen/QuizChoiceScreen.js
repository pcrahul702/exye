import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/Group.png';
import uppershaper from '../assets/uppershape.png';
import upperLog from '../assets/Upperlogo2.png';

import { useNavigation, useRoute } from '@react-navigation/native';
import { getData, postData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const { width, height } = Dimensions.get('window');

const QuizChoiceScreen = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const { contestId, topicId } = route.params;

    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        console.log(contestId, topicId);
        getQuestions(contestId, topicId);
    }, [contestId]);

    const getQuestions = async (contestId, topicId) => {
        try {
            setLoading(true);
            const res = await getData(`/api/v1/quiz/${topicId}/contest/${contestId}`);
            console.log('Start Quiz Response data:', res.data);

            if (res.data && Array.isArray(res.data)) {
                if (res.data[0].questions) {
                    setQuestionsData(res.data[0].questions);
                } else {
                    setQuestionsData(res.data);
                }
            } else {
                Alert.alert("No valid data found.");
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert(error?.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false); // Set loading to false after fetching is complete
        }
    };

    const handleQuestionPress = async (quizId) => {
    
            const token = await getAccessToken();
            console.log(token);
            
            
            try {
                const data = await postData(`/api/v1/quiz/start/${quizId}/contest/${contestId}/topic/${topicId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });    
                console.log("hello ",data);
                navigation.navigate('Progress', { contestId: contestId, topicId: topicId, quizId: quizId });
            } catch (error) {
                console.error('Error during starting quiz:', error.response.data);
            }
    };


    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.backgroundImage} />
            <Image source={uppershaper} style={styles.uppershape} />
            <Image source={upperLog} style={styles.upperLogo} />

            <Text style={styles.header}>Choose any of the question below, to start the contest.</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading questions...</Text>
                    </View>
                ) : questionsData.length > 0 ? (
                    questionsData.map((question, index) => (
                        <TouchableOpacity
                            key={question.id}
                            style={styles.questionButton}
                            onPress={() => handleQuestionPress(question.quizId)}
                        >
                            <Text style={styles.questionText}>Question {index + 1}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noQuestionsText}>No questions available.</Text>
                )}
            </ScrollView>
        </View>
    );
}

export default QuizChoiceScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        flex: 1,
    },
    uppershape: {
        width: '100%',
        resizeMode: 'stretch',
        top: 0,
    },
    upperLogo: {
        alignSelf: 'center',
        height: width * 0.5,
        width: width * 0.5,
        marginTop: 20,
        resizeMode: 'stretch',
        marginTop: -0.25 * width,
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
    header: {
        width: '85%',
        alignSelf: 'center',
        color: 'white',
        fontSize: 21,
        fontWeight: '800',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        backgroundColor: '#EF5A5A',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
        elevation: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginTop: 20,
    },
    scrollContainer: {
        width: '85%',
        alignSelf: 'center',
        paddingBottom: 50,
        marginTop: 20,
    },
    questionButton: {
        backgroundColor: '#ffa952',
        marginVertical: 8,
        paddingVertical: 12,
        borderRadius: 35,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        elevation: 5,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'left',
        fontFamily: 'Poppins-Regular',
    },
    noQuestionsText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
    },
});

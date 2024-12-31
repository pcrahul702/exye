import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getData, postData } from '../Utils/api';
import { getAccessToken } from '../Utils/getAccessToken';

const { width, height } = Dimensions.get('window');

const QuestionScreen = () => {
    const [selectedRadio, setSelectedRadio] = useState(0);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [questionsData, setQuestionsData] = useState([]);
    const [question, setQuestion] = useState('Loading...');
    const [questionId, setQuestionId] = useState('');
    const [options, setOptions] = useState([
        { key: 'option_1', value: "Loading" },
        { key: 'option_2', value: "Loading" },
        { key: 'option_3', value: "Loading" },
        { key: 'option_4', value: "Loading" },
    ]);

    const navigation = useNavigation();

    const fontSize = width * 0.05;

    const route = useRoute();
    const { contestId, topicId, quizId } = route.params;


    useEffect(() => {
        console.log(contestId, topicId, quizId);
        getQuestionOptions();
    }, [contestId]);

    const getQuestionOptions = async () => {
        try {
            const res = await getData(`/api/v1/quiz/${quizId}`);
            console.log(res);
            setQuestionsData(res);

            const firstQuestion = res.questions && res.questions[0];

            if (firstQuestion) {
                setQuestion(firstQuestion.subtitle);
                setQuestionId(firstQuestion.questionId);
                const optionsArray = firstQuestion.optionsMetadata?.options || [];
                setOptions(optionsArray);
            } else {
                Alert.alert('No questions found!');
            }

        } catch (error) {
            console.log('error', error);
            Alert.alert(error?.response?.data?.message || 'An error occured');
        }
    };

    const handleSubmit = async () => {

        const token = await getAccessToken();
        console.log(token);

        const payload = {
            answers: [
                {
                    questionId: questionId,
                    selectedOptions: [selectedRadio]
                }
            ]
        };
        console.log("payload data".payload);
        try {
            const data = await postData(`/api/v1/quiz/submit-answer/${quizId}/contest/${contestId}/topic/${topicId}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            console.log(data);
            navigation.navigate('LoadingPavilion');
        } catch (error) {
            console.error('Error during answer submission:', error.response.data);
        }

    };

    return (
        <View style={styles.bg}>
            <StatusBar hidden={true} />
            <Image
                source={require('../assets/cloud2.png')}
                style={styles.topImage}
            />
            <Image
                source={require('../assets/elements.png')}
                style={styles.bottomImage}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <Text style={styles.question}>
                    {question}
                </Text>

                <View style={styles.optionsContainer}>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => {
                                setSelectedRadio(item.key);
                                setIsSubmitDisabled(false);
                            }}
                            style={styles.optionItem}
                        >
                            <View style={styles.radio}>
                                {selectedRadio === item.key && <View style={styles.radioBG} />}
                            </View>
                            <Text style={[styles.radioText, { fontSize }]}>{item.value}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            {
                                backgroundColor: isSubmitDisabled
                                    ? 'rgba(61, 196, 103, 0.6)'
                                    : 'green',
                            },
                        ]}
                        disabled={isSubmitDisabled}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    scrollContainer: {
        padding: 16, // Ensure there's padding around the content
        alignItems: 'center', // Center content horizontally
    },
    topImage: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        resizeMode: 'stretch',
        top: 0,
        left: 0,
    },
    bottomImage: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        resizeMode: 'stretch',
    },
    question: {
        width: '90%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 30,
        marginTop: '20%',
        alignSelf: 'center',
        fontWeight: '500',
        color: '#FFFFFF',
        letterSpacing: 1,
        fontFamily: 'Poppins-Regular'
    },
    optionsContainer: {
        width: '90%',
        backgroundColor: '#FFFFDF',
        borderRadius: 20,
        padding: 16, // Padding inside the container
        marginVertical: '20%', // Margin to separate from other elements
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8, // Space between options
    },
    radioText: {
        width: '80%',
        color: 'black',
        marginLeft: 10,
        fontFamily: 'Poppins-Regular',
    },
    radio: {
        height: 35,
        width: 35,
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioBG: {
        height: 20,
        width: 20,
        backgroundColor: '#EF5A5A',
        borderRadius: 20,
    },
    submitButton: {
        width: '80%',
        height: 78,
        alignSelf: 'center',
        borderRadius: 40,
        borderColor: 'white',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        backgroundColor: 'green'
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
});

export default QuestionScreen;

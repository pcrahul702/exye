import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Image, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const QuestionScreen = () => {
    const [selectedRadio, setSelectedRadio] = useState(0);
    const navigation = useNavigation();
    const fontSize = width * 0.05; // Adjust font size to be a percentage of screen width

    const handleSubmit = () => {
        navigation.navigate('LoadingPavilion');
    };

    const options = [
        { id: 1, name: "option1" },
        { id: 2, name: "option2" },
        { id: 3, name: "option3" },
        { id: 4, name: "option4" }
    ];

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
                Question will display here
                </Text>

                <View style={styles.optionsContainer}>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => setSelectedRadio(item.id)}
                            style={styles.optionItem}
                        >
                            <View style={styles.radio}>
                                {selectedRadio === item.id && <View style={styles.radioBG} />}
                            </View>
                            <Text style={[styles.radioText, { fontSize }]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.submitButton}
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
        letterSpacing:1,
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
        width:'80%',
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
        backgroundColor:'green'
    },
    submitText: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
    },
});

export default QuestionScreen;

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TopicScreen = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isReadyButtonDisabled, setIsReadyButtonDisabled] = useState(true);
    const navigation = useNavigation();

    const handleReady = () => {
        navigation.navigate('Progress');
    };

    const toggleCardSelection = (id) => {
        setSelectedCard(selectedCard === id ? null : id);
        setIsReadyButtonDisabled(selectedCard === id ? true : false);
        console.log("ss" + selectedCard);

    };

    const data = [
        { id: 1, image: require('../assets/peacock.png'), text: 'Environment', description: 'This topic will include question of various Floras and Faunas around us.' },
        { id: 2, image: require('../assets/india.png'), text: 'India', description: 'This topic will include question of various events and people of India.' },
        { id: 3, image: require('../assets/sports.png'), text: 'Sports', description: 'This topic will include question on sport and.' },
        { id: 4, image: require('../assets/internationalAff.png'), text: 'World', description: 'This topic will include question on various events and people around the globe.' },
        { id: 5, image: require('../assets/astronomy.png'), text: 'Astronomy', description: 'This topic will include question on Space and Universe.' },
        { id: 6, image: require('../assets/gk.png'), text: 'G.K.', description: 'This topic will include question on various general topics and subjects.' },
        { id: 7, image: require('../assets/science.png'), text: 'Science', description: 'This topic will include question on Biology, Physics and Chemistry.' },
        { id: 8, image: require('../assets/history.png'), text: 'History', description: 'This topic will include question on various Historical events around us.' },
        { id: 9, image: require('../assets/bollywood.png'), text: 'Bollywood', description: 'This topic will include question on Bollywood movie stars and event on the big screen.' },
        { id: 10, image: require('../assets/geography.png'), text: 'Geography', description: 'This topic will include question on landscape and geography around the globe.' },
    ];

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
                                <Text style={styles.cardDescription}>{item.description}</Text>
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
    header:{
        alignSelf:'center',
        color:'green',
        fontSize:25,
        fontWeight:'700',
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
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        alignItems: 'center',
        padding: 10,
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
        fontSize: 17,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#EF5A5A',
        fontFamily: 'Poppins-Regular'
    },
    cardDescription: {
        marginTop: 5,
        fontSize: 14,
        color: 'black',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Poppins-Regular'
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
        fontFamily: 'Poppins-Regular' ,
    },
});

export default TopicScreen;
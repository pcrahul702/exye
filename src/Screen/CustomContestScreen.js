import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import CustomSlider from '../components/CustomSlider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { postData } from '../Utils/api';
import Toast from 'react-native-toast-message';

const CustomContestScreen = () => {
    const [entryFee, setEntryFee] = useState(0);
    const [participantLimit, setParticipantLimit] = useState(10);
    const navigation = useNavigation();

    const route = useRoute();

    const { topicId, contestName, prizeAmount, date, time } = route.params;

    const handleSubmit = async () => {

        const payload = {
            contestName: contestName,
            contestType: "LIVE",
            prizePerContestant: parseInt(prizeAmount, 10),
            topicId: topicId,
            entryAmount: entryFee,
            maxParticipants: participantLimit,
            whenToStart: formatDateToFixedTimezone(date, time)
        };

        console.log("payload data", payload);

        try {
            const data = await postData('/api/v1/quiz/custom-contest', payload);
            showToast('success','Contest Created Successfully.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during contest crreation:', error);
            showToast('error','Contest could not be created. Try again.')
        }

    };

    const showToast = (type, message1, message2 = '') => {
        Toast.show({
            type: type,
            position: 'bottom',
            text1: message1,
            text2: message2,
            visibilityTime: 3000, // How long the toast is visible
            autoHide: true, // Hide after time
        });
    };

    const formatDateToFixedTimezone = (date, time) => {
        // Combine the date and time
        const combinedDateTime = new Date(
            date.toISOString().split('T')[0] + 'T' + time.toISOString().split('T')[1]
        );

        // Extract the ISO string without the 'Z' (which represents UTC)
        const formattedDate = combinedDateTime.toISOString().replace('.000Z', '') + '+05:30';

        return formattedDate;
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Group.png')} style={styles.backgroundImage} />
            <StatusBar hidden={true} />

            <Text style={styles.sliderValue}>{entryFee}</Text>

            <CustomSlider
                minValue={0}
                maxValue={100}
                step={1}
                value={entryFee}
                onValueChange={setEntryFee}
            />
            <Text style={styles.sliderLabel}>Choose Entry Fee</Text>

            <Text style={styles.sliderValue}>{participantLimit}</Text>

            <CustomSlider
                minValue={10}
                maxValue={1000}
                step={10}
                value={participantLimit}
                onValueChange={setParticipantLimit}
            />
            <Text style={styles.sliderLabel}>Choose Participant Limit</Text>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <Image source={require('../assets/k.png')} style={styles.bottomImage} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e9e9e9',
        paddingTop: 80,
    },
    backgroundImage: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        resizeMode: 'contain',
        top: 90,
        left: 0,
        opacity: 0.8,
    },
    sliderValue: {
        fontSize: 40,
        fontWeight: '700',
        color: '#F05A5B',
        marginTop: 20,
    },
    sliderLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: '#F05A5B',
        marginTop: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
        letterSpacing: 2,
    },
    submitButton: {
        width: '50%',
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
    submitText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular'
    },
    bottomImage: {
        width: '80%',
        position: 'absolute',
        bottom: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity: 0.8,
    },
});

export default CustomContestScreen;
